import { CreateRelationshipCommand } from '../commands/RelationshipCommands';
import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { Relationship } from '../../domain/entities/Relationship';
import { v4 as uuidv4 } from 'uuid';
import { IOntologyService } from '../../domain/interfaces/RelationshipServices';
import { RelationshipId, EntityId, RelationshipTypeId } from '../../domain/value-objects/RelationshipValueObjects';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class CreateRelationshipHandler {
  constructor(
    private readonly repository: IRelationshipRepository,
    private readonly ontologyService: IOntologyService,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: CreateRelationshipCommand): Promise<string> {
    await this.ontologyService.validateRelationshipType(
      command.relationshipTypeId,
      command.sourceEntityTypeId,
      command.targetEntityTypeId
    );
    
    const id = new RelationshipId(uuidv4());
    const relationship = Relationship.create(
      id,
      new EntityId(command.sourceEntityId),
      new EntityId(command.targetEntityId),
      new RelationshipTypeId(command.relationshipTypeId)
    );
    
    await this.repository.save(relationship);

    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'CREATE_RELATIONSHIP',
      actorId: command.userId,
      actorType: 'USER',
      ipAddress: '127.0.0.1',
      userAgent: 'unknown',
      resourceId: id.toString(),
      resourceType: 'RELATIONSHIP',
      metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));

    for (const event of relationship.domainEvents) {
        await this.eventBus.publish(event);
    }
    relationship.clearDomainEvents();

    return id.toString();
  }
}
