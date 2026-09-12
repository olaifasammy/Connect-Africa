import {
  inject,
  injectable,
} from 'inversify';
import { provide } from 'inversify-binding-decorators';

import {
  DeleteRelationshipCommand,
} from '../commands/RelationshipCommands';

import {
  IRelationshipRepository,
} from '../../domain/repositories/IRelationshipRepository';

import {
  RelationshipId,
} from '../../domain/value-objects/RelationshipValueObjects';

import {
  EventBus,
} from '@shared/infrastructure/queue/EventBus';

import {
  AuditLogRequestedEvent,
} from '@modules/audit/public';

import {
  RelationshipNotFoundError,
  RelationshipValidationError,
} from '../../domain/errors/RelationshipErrors';

@provide(DeleteRelationshipHandler, true)
@injectable()
export class DeleteRelationshipHandler {
  constructor(
    @inject('IRelationshipRepository')
    private readonly repository:
      IRelationshipRepository,

    @inject('EventBus')
    private readonly eventBus:
      EventBus,
  ) {}

  async handle(
    command: DeleteRelationshipCommand,
    userId: string,
  ): Promise<void> {
    if (!command.id.trim()) {
      throw new RelationshipValidationError(
        'Relationship ID is required.',
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

    /*
     * Capture the domain event before persistence removes the
     * aggregate from the canonical store.
     */
    relationship.delete();

    await this.repository.delete(
      relationshipId,
    );

    for (
      const event of relationship.domainEvents
    ) {
      await this.eventBus.publish(event);
    }

    relationship.clearDomainEvents();

    await this.eventBus.publish(
      new AuditLogRequestedEvent({
        action: 'DELETE_RELATIONSHIP',
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
        ],
      }),
    );
  }
}