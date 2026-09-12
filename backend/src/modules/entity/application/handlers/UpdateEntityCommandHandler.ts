import {
  inject,
  injectable,
} from 'inversify';

import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';

import { UpdateEntityCommand } from '@modules/entity/application/commands/UpdateEntityCommand';

import { EntityId } from '@modules/entity/domain/value-objects/EntityId';

import { EntityName } from '@modules/entity/domain/value-objects/EntityName';

import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';

import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';

import { EventBus } from '@shared/infrastructure/queue/EventBus';

import { EntityUpdatedEvent } from '@modules/entity/domain/events/EntityUpdatedEvent';

import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

import { IOntologyGraphService } from '@modules/ontology/public';

@provide(
  UpdateEntityCommandHandler,
  true,
)
@injectable()
export class UpdateEntityCommandHandler
  implements
    ICommandHandler<
      UpdateEntityCommand,
      void
    >
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository:
      IEntityRepository,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,

    @inject('IOntologyGraphService')
    private readonly ontologyGraphService:
      IOntologyGraphService,
  ) {}

  @Audit(
    'UPDATE_ENTITY',
    'ENTITY',
  )
  async handle(
    command: UpdateEntityCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<void> {
    const {
      entityId,
      dto,
    } = command;

    const id =
      EntityId.create(
        entityId,
      );

    const entity =
      await this.entityRepository.findById(
        id,
      );

    if (!entity) {
      throw new Error(
        `Entity with ID ${entityId} not found.`,
      );
    }

    const currentMetadata =
      entity.metadata;

    const nextAttributes =
      dto.attributes !==
      undefined
        ? dto.attributes
        : currentMetadata.attributes;

    const isValidMetadata =
      await this.ontologyGraphService
        .validateMetadataSchema(
          entity.typeId.value,
          nextAttributes,
        );

    if (!isValidMetadata) {
      throw new Error(
        `Metadata schema violation for entity type: ${entity.typeId.value}`,
      );
    }

    if (
      dto.name !==
      undefined
    ) {
      entity.updateName(
        EntityName.create(
          dto.name,
        ),
      );
    }

    const metadataChanged =
      dto.description !==
        undefined ||
      dto.source !==
        undefined ||
      dto.tags !==
        undefined ||
      dto.attributes !==
        undefined;

    if (metadataChanged) {
      entity.updateMetadata(
        EntityMetadata.create({
          slug:
            currentMetadata.slug,

          description:
            dto.description !==
            undefined
              ? dto.description
              : currentMetadata.description,

          source:
            dto.source !==
            undefined
              ? dto.source
              : currentMetadata.source,

          tags:
            dto.tags !==
            undefined
              ? dto.tags
              : currentMetadata.tags,

          attributes:
            nextAttributes,
        }),
      );
    }

    await this.entityRepository.save(
      entity,
    );

    await this.eventBus.publish(
      new EntityUpdatedEvent(
        entity,
      ),
    );
  }
}