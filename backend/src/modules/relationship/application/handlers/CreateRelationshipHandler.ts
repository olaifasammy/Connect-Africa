import { CreateRelationshipCommand } from '../commands/RelationshipCommands';
import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { Relationship } from '../../domain/entities/Relationship';
import { v4 as uuidv4 } from 'uuid';
import { IOntologyService, IEventBus } from '../../domain/interfaces/RelationshipServices';
import { RelationshipId, EntityId, RelationshipTypeId } from '../../domain/value-objects/RelationshipValueObjects';
import { IAuditRepository } from '@modules/audit/public';
import { 
  AuditEntry, 
  AuditActor, 
  AuditResource, 
  AuditMetadata, 
  CorrelationId, 
  Timestamp, 
  UserId, 
  ResourceId, 
  IPAddress, 
  UserAgent 
} from '@modules/audit/public';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class CreateRelationshipHandler {
  constructor(
    private readonly repository: IRelationshipRepository,
    private readonly ontologyService: IOntologyService,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: IEventBus
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

    // Audit logging
    const auditEntry = AuditEntry.create({
      action: 'CREATE_RELATIONSHIP',
      actor: AuditActor.create({
        userId: new UserId(command.userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId(id.toString()),
        type: 'RELATIONSHIP'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    
    await this.auditRepository.log(auditEntry);

    for (const event of relationship.domainEvents) {
        await this.eventBus.publish(event);
    }
    relationship.clearDomainEvents();

    return id.toString();
  }
}
