import { CreateRelationshipCommand } from '../commands/RelationshipCommands';
import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { RelationshipValidationService } from '../../domain/services/RelationshipValidationService';
import { Relationship } from '../../domain/entities/Relationship';
import { RelationshipId, EntityId, RelationshipTypeId } from '../../domain/value-objects/RelationshipValueObjects';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { logger } from '@shared/logger/Logger';

/**
 * Application service orchestrating relationship operations with Audit and Event support.
 */
export class RelationshipService {
  constructor(
    private readonly repository: IRelationshipRepository,
    private readonly validationService: RelationshipValidationService,
    private readonly eventBus: EventBus
  ) {}

  async createRelationship(command: CreateRelationshipCommand): Promise<void> {
    const relationship = Relationship.create(
      new RelationshipId(),
      new EntityId(command.sourceEntityId),
      new EntityId(command.targetEntityId),
      new RelationshipTypeId(command.relationshipTypeId)
    );

    await this.validationService.validate(relationship);
    await this.repository.save(relationship);

    // Audit Logging
    AuditLogger.log({
        user: command.userId,
        action: 'CREATE_RELATIONSHIP',
        resource: 'RELATIONSHIP',
        status: 'SUCCESS'
    });

    // Domain Event Publishing
    await this.eventBus.publish(relationship.domainEvents);
    relationship.clearDomainEvents();

    logger.info(`Relationship created: ${relationship.id.toString()}`);
  }
}
