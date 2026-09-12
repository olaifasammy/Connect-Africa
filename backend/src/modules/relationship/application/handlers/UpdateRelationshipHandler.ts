import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import {
  UpdateRelationshipCommand,
} from '../commands/RelationshipCommands';

import {
  IRelationshipRepository,
} from '../../domain/repositories/IRelationshipRepository';

import {
  RelationshipId,
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
  RelationshipNotFoundError,
  RelationshipValidationError,
} from '../../domain/errors/RelationshipErrors';

@provide(UpdateRelationshipHandler, true)
@injectable()
export class UpdateRelationshipHandler {
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
    command: UpdateRelationshipCommand,
    userId: string,
  ): Promise<void> {
    if (!command.id.trim()) {
      throw new RelationshipValidationError(
        'Relationship ID is required.',
      );
    }

    if (!command.relationshipTypeId.trim()) {
      throw new RelationshipValidationError(
        'Relationship type ID is required.',
      );
    }

    if (!userId.trim()) {
      throw new RelationshipValidationError(
        'Authenticated user ID is required.',
      );
    }

    const relationshipId =
      new RelationshipId(command.id);

    const relationship =
      await this.repository.findById(
        relationshipId,
      );

    if (!relationship) {
      throw new RelationshipNotFoundError(
        `Relationship with ID ${command.id} not found.`,
      );
    }

    const sourceEntity =
      await this.entityService.findById(
        relationship.sourceEntityId.value,
      );

    if (!sourceEntity) {
      throw new RelationshipValidationError(
        `Source entity not found: ${relationship.sourceEntityId.value}`,
      );
    }

    const targetEntity =
      await this.entityService.findById(
        relationship.targetEntityId.value,
      );

    if (!targetEntity) {
      throw new RelationshipValidationError(
        `Target entity not found: ${relationship.targetEntityId.value}`,
      );
    }

    /*
     * Entity owns the authoritative EntityType.
     * The ontology validator receives EntityType IDs, never
     * presentation/type objects from the Entity aggregate.
     */
    await this.ontologyService.validateRelationshipType(
      command.relationshipTypeId,
      sourceEntity.typeId.value,
      targetEntity.typeId.value,
    );

    const previousType =
      relationship.relationshipTypeId.value;

    if (
      previousType ===
      command.relationshipTypeId
    ) {
      return;
    }

    relationship.updateRelationshipType(
      new RelationshipTypeId(
        command.relationshipTypeId,
      ),
    );

    try {
      await this.repository.update(
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
        action: 'UPDATE_RELATIONSHIP',
        actorId: userId,
        actorType: 'USER',
        ipAddress: '0.0.0.0',
        userAgent: 'unknown',
        resourceId: command.id,
        resourceType: 'RELATIONSHIP',
        metadata: [
          {
            key: 'status',
            value: 'SUCCESS',
          },
          {
            key: 'previousRelationshipTypeId',
            value: previousType,
          },
          {
            key: 'newRelationshipTypeId',
            value:
              relationship.relationshipTypeId.value,
          },
        ],
      }),
    );
  }
}