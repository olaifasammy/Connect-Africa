import {
  injectable,
  inject,
} from 'inversify';

import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { CreateEntityCommand } from '@modules/entity/application/commands/CreateEntityCommand';

import { Entity } from '@modules/entity/domain/entities/Entity';

import { EntityId } from '@modules/entity/domain/value-objects/EntityId';

import { EntityName } from '@modules/entity/domain/value-objects/EntityName';

import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';

import { EntityTypeId } from '@modules/entity/domain/value-objects/EntityValueObjects';

import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';

import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

import { EventBus } from '@shared/infrastructure/queue/EventBus';

import { IOntologyGraphService } from '@modules/ontology/public';

import { SlugGenerationService } from '@modules/entity/domain/services/SlugGenerationService';

import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(
  CreateEntityCommandHandler,
  true,
)
@injectable()
export class CreateEntityCommandHandler
  implements
    ICommandHandler<
      CreateEntityCommand,
      void
    >
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository:
      IEntityRepository,

    @inject('IOntologyGraphService')
    private readonly ontologyGraphService:
      IOntologyGraphService,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,

    private readonly slugGenerationService:
      SlugGenerationService,
  ) {}

  @Audit(
    'CREATE_ENTITY',
    'ENTITY',
  )
  async handle(
    command: CreateEntityCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<void> {
    const {
      name,
      type,
      description,
      source,
      tags,
      attributes,
    } = command.dto;

    const typeId =
      EntityTypeId.create(type);

    const isValidType =
      await this.ontologyGraphService
        .validateEntityType(
          typeId.value,
        );

    if (!isValidType) {
      throw new Error(
        `Invalid entity type: ${typeId.value}`,
      );
    }

    const isValidMetadata =
      await this.ontologyGraphService
        .validateMetadataSchema(
          typeId.value,
          attributes ?? {},
        );

    if (!isValidMetadata) {
      throw new Error(
        `Metadata schema violation for entity type: ${typeId.value}`,
      );
    }

    const entityName =
      EntityName.create(name);

    const slug =
      this.slugGenerationService.generate(
        entityName,
      );

    if (!slug) {
      throw new Error(
        'Unable to generate a canonical slug for the entity.',
      );
    }

    const slugExists =
      await this.entityRepository
        .existsBySlug(slug);

    if (slugExists) {
      throw new Error(
        `Entity slug already exists: ${slug}`,
      );
    }

    const entity =
      Entity.create(
        EntityId.create(
          new UniqueEntityId()
            .toString(),
        ),
        entityName,
        typeId,
        EntityMetadata.create({
          slug,
          description,
          source,
          tags: tags ?? [],
          attributes:
            attributes ?? {},
        }),
      );

    await this.entityRepository.save(
      entity,
    );

    for (
      const event of entity.domainEvents
    ) {
      await this.eventBus.publish(
        event,
      );
    }

    entity.clearDomainEvents();
  }
}