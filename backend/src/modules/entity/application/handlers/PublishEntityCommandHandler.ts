import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { PublishEntityCommand } from '@modules/entity/application/commands/PublishEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityPublishedEvent } from '@modules/entity/domain/events/EntityPublishedEvent';
import { AuditEntry } from '@modules/audit/domain/aggregates/AuditEntry';
import { AuditActor } from '@modules/audit/domain/entities/AuditActor';
import { AuditResource } from '@modules/audit/domain/entities/AuditResource';
import { AuditMetadata } from '@modules/audit/domain/entities/AuditMetadata';
import { CorrelationId, Timestamp, UserId, ResourceId, IPAddress, UserAgent } from '@modules/audit/domain/value-objects/AuditValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class PublishEntityCommandHandler implements ICommandHandler<PublishEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: PublishEntityCommand): Promise<void> {
    const { entityId, userId } = command;
    const id = EntityId.create(entityId);

    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new Error(`Entity with ID ${entityId} not found.`);
    }

    // In a real scenario, we would trigger domain-level publishing logic
    // (e.g., entity.publish()). For this prototype, we trigger the event.
    
    await this.eventBus.publish(new EntityPublishedEvent(entity));

    // Audit logging
    const auditEntry = AuditEntry.create({
      action: 'PUBLISH_ENTITY',
      actor: AuditActor.create({
        userId: new UserId(userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId(entityId),
        type: 'ENTITY'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });

    await this.auditRepository.log(auditEntry);
  }
}
