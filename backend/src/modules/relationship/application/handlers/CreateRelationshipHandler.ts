import { CreateRelationshipCommand } from '../commands/RelationshipCommands';
import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { Relationship } from '../../domain/entities/Relationship';
import { v4 as uuidv4 } from 'uuid';
import { IOntologyService, IAuditLogger, IEventBus } from '../../domain/interfaces/RelationshipServices';
import { RelationshipId, EntityId, RelationshipTypeId } from '../../domain/value-objects/RelationshipValueObjects';

export class CreateRelationshipHandler {
  constructor(
    private readonly repository: IRelationshipRepository,
    private readonly ontologyService: IOntologyService,
    private readonly auditLogger: IAuditLogger,
    private readonly eventBus: IEventBus
  ) {}

  async handle(command: CreateRelationshipCommand): Promise<string> {
    await this.ontologyService.validateRelationshipType(command.relationshipTypeId);
    
    const id = new RelationshipId(uuidv4());
    const relationship = Relationship.create(
      id,
      new EntityId(command.sourceEntityId),
      new EntityId(command.targetEntityId),
      new RelationshipTypeId(command.relationshipTypeId)
    );
    
    await this.repository.save(relationship);

    await this.auditLogger.log('RELATIONSHIP_CREATED', { relationshipId: id.toString(), ...command });

    for (const event of relationship.domainEvents) {
        await this.eventBus.publish(event);
    }
    relationship.clearDomainEvents();

    return id.toString();
  }
}
