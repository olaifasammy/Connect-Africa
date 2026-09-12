import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import {
  CreateRelationshipCommand,
} from '../commands/RelationshipCommands';

import {
  IRelationshipRepository,
} from '../../domain/repositories/IRelationshipRepository';

import {
  Relationship,
} from '../../domain/entities/Relationship';

import {
  RelationshipId,
  EntityId,
  RelationshipTypeId,
} from '../../domain/value-objects/RelationshipValueObjects';

import {
  IOntologyService,
} from '../../domain/interfaces/RelationshipServices';

import {
  IEntityService,
} from '@modules/entity/domain/interfaces/IEntityService';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

import {
  AuditLogRequestedEvent,
} from '@modules/audit/public';

import {
  RelationshipConflictError,
  RelationshipValidationError,
} from '../../domain/errors/RelationshipErrors';

@provide(CreateRelationshipHandler, true)
@injectable()
export class CreateRelationshipHandler {
  constructor(
    @inject('IRelationshipRepository')
    private readonly repository:
      IRelationshipRepository,

    @inject('IOntologyService')
    private readonly ontologyService:
      IOntologyService,

    @inject('IEntityService')
    private readonly entityService:
      IEntityService,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,
  ) {}

  async handle(
    command: CreateRelationshipCommand,
  ): Promise<string> {
    if (!command.sourceEntityId.trim()) {
      throw new RelationshipValidationError(
        'Source entity ID is required.',
      );
    }

    if (!command.targetEntityId.trim()) {
      throw new RelationshipValidationError(
        'Target entity ID is required.',
      );
    }

    if (!command.relationshipTypeId.trim()) {
      throw new RelationshipValidationError(
        'Relationship type ID is required.',
      );
    }

    if (!command.userId.trim()) {
      throw new RelationshipValidationError(
        'Authenticated user ID is required.',
      );
    }

    if (
      command.sourceEntityId ===
      command.targetEntityId
    ) {
      throw new RelationshipValidationError(
        'Source and target entity cannot be the same.',
      );
    }

    const sourceEntity =
      await this.entityService.findById(
        command.sourceEntityId,
      );

    if (!sourceEntity) {
      throw new RelationshipValidationError(
        `Source entity not found: ${command.sourceEntityId}`,
      );
    }

    const targetEntity =
      await this.entityService.findById(
        command.targetEntityId,
      );

    if (!targetEntity) {
      throw new RelationshipValidationError(
        `Target entity not found: ${command.targetEntityId}`,
      );
    }

    /*
     * Entity owns the authoritative EntityType.
     * Client-supplied entity type information is never trusted.
     */
    const sourceEntityTypeId =
      sourceEntity.typeId.value;

    const targetEntityTypeId =
      targetEntity.typeId.value;

    await this.ontologyService.validateRelationshipType(
      command.relationshipTypeId,
      sourceEntityTypeId,
      targetEntityTypeId,
    );

    const relationship =
      Relationship.create(
        new RelationshipId(),
        new EntityId(
          sourceEntity.entityId.value,
        ),
        new EntityId(
          targetEntity.entityId.value,
        ),
        new RelationshipTypeId(
          command.relationshipTypeId,
        ),
      );

    /*
     * Early duplicate detection provides the normal failure path.
     * The database UNIQUE constraint remains the authoritative
     * concurrency-safe protection.
     */
    if (
      await this.repository.exists(
        relationship,
      )
    ) {
      throw new RelationshipConflictError(
        'Relationship already exists for the same source entity, target entity, and relationship type.',
      );
    }

    try {
      await this.repository.save(
        relationship,
      );
    } catch (error) {
      if (
        error instanceof RelationshipConflictError
      ) {
        throw error;
      }

      throw error;
    }

    for (
      const event of relationship.domainEvents
    ) {
      await this.eventBus.publish(event);
    }

    relationship.clearDomainEvents();

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'CREATE_RELATIONSHIP',
        actorId: command.userId,
        actorType: 'USER',
        ipAddress: '0.0.0.0',
        userAgent: 'unknown',
        resourceId:
          relationship.id.toString(),
        resourceType: 'RELATIONSHIP',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
          {
            key: 'sourceEntityTypeId',
            value: sourceEntityTypeId,
          },
          {
            key: 'targetEntityTypeId',
            value: targetEntityTypeId,
          },
          {
            key: 'relationshipTypeId',
            value:
              command.relationshipTypeId,
          },
        ],
      }),
    );

    return relationship.id.toString();
  }
}