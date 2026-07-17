import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { CreateEntityCommand } from '@modules/entity/application/commands/CreateEntityCommand';
import { Entity } from '@modules/entity/domain/entities/Entity';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { EntityName } from '@modules/entity/domain/value-objects/EntityName';
import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EntityValidator } from '@modules/entity/domain/validators/EntityValidator';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { IAuditRepository } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
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

export class CreateEntityCommandHandler implements ICommandHandler<CreateEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: CreateEntityCommand): Promise<void> {
    const { name, type, description, source, tags } = command.dto;

    const entity = Entity.create(
      EntityId.create(new UniqueEntityId().toString()),
      EntityName.create(name),
      type,
      EntityMetadata.create({ description, source, tags: tags || [] })
    );

    EntityValidator.validate(entity);

    await this.entityRepository.save(entity);
    
    // Publish domain events
    for (const event of entity.domainEvents) {
        await this.eventBus.publish(event);
    }
    entity.clearDomainEvents();

    // Audit logging
    const auditEntry = AuditEntry.create({
      action: 'CREATE_ENTITY',
      actor: AuditActor.create({
        userId: new UserId(command.userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId(entity.entityId.value),
        type: 'ENTITY'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });
    
    await this.auditRepository.log(auditEntry);
  }
}
