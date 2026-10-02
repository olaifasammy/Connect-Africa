import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { v4 as uuidv4 } from 'uuid';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ImportEntitiesCommand } from '../commands/ImportEntitiesCommand';
import { Entity } from '@modules/entity/domain/entities/Entity';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { EntityName } from '@modules/entity/domain/value-objects/EntityName';
import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';
import { EntityTypeId } from '@modules/entity/domain/value-objects/EntityValueObjects';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { IOntologyGraphService } from '@modules/ontology/public';
import { SlugGenerationService } from '@modules/entity/domain/services/SlugGenerationService';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

export interface ImportEntitiesResponse {
  successCount: number;
  failureCount: number;
  errors: { itemIndex: number; error: string }[];
}

@provide(ImportEntitiesCommandHandler, true)
@injectable()
export class ImportEntitiesCommandHandler
  implements ICommandHandler<ImportEntitiesCommand, ImportEntitiesResponse>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,

    @inject('IOntologyGraphService')
    private readonly ontologyGraphService: IOntologyGraphService,

    @inject('EventBus')
    private readonly eventBus: EventBus,

    private readonly slugGenerationService: SlugGenerationService,
  ) {}

  @Audit('IMPORT_ENTITIES', 'ENTITY')
  async handle(
    command: ImportEntitiesCommand,
    _userId?: string,
    _ipAddress?: string,
  ): Promise<ImportEntitiesResponse> {
    const { items } = command;
    let successCount = 0;
    let failureCount = 0;
    const errors: { itemIndex: number; error: string }[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      try {
        if (!item.name?.trim()) {
          throw new Error('Entity name is required.');
        }

        if (!item.type?.trim()) {
          throw new Error('Entity type is required.');
        }

        const typeId = EntityTypeId.create(item.type);

        // Validate entity type exists
        const isValidType = await this.ontologyGraphService.validateEntityType(typeId.value);
        if (!isValidType) {
          throw new Error(`Invalid entity type: ${typeId.value}`);
        }

        const entityName = EntityName.create(item.name);
        let slug = this.slugGenerationService.generate(entityName);

        if (!slug) {
          slug = entityName.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        }

        // Deduplicate slug dynamically by appending random numeric suffix if it exists
        let finalSlug = slug;
        let suffix = 1;
        while (await this.entityRepository.existsBySlug(finalSlug)) {
          suffix++;
          finalSlug = `${slug}-${suffix}`;
        }

        const entity = Entity.create(
          EntityId.create(uuidv4()),
          entityName,
          typeId,
          EntityMetadata.create({
            slug: finalSlug,
            description: item.description,
            source: item.source,
            tags: item.tags ?? [],
            attributes: item.attributes ?? {},
          }),
        );

        await this.entityRepository.save(entity);

        for (const event of entity.domainEvents) {
          await this.eventBus.publish(event);
        }
        entity.clearDomainEvents();

        successCount++;
      } catch (err: any) {
        failureCount++;
        errors.push({
          itemIndex: i,
          error: err.message || 'Unknown import error',
        });
      }
    }

    return {
      successCount,
      failureCount,
      errors,
    };
  }
}
