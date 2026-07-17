import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { MergeEntitiesCommand } from '@modules/entity/application/commands/MergeEntitiesCommand';
import { IEntityMergeService } from '@modules/entity/domain/services/IEntityMergeService';
import { IAuditRepository } from '@modules/audit/public';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityMergedEvent } from '@modules/entity/domain/events/EntityMergedEvent';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { AuditEntry } from '@modules/audit/domain/aggregates/AuditEntry';
import { AuditActor } from '@modules/audit/domain/entities/AuditActor';
import { AuditResource } from '@modules/audit/domain/entities/AuditResource';
import { AuditMetadata } from '@modules/audit/domain/entities/AuditMetadata';
import { CorrelationId, Timestamp, UserId, ResourceId, IPAddress, UserAgent } from '@modules/audit/domain/value-objects/AuditValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class MergeEntitiesCommandHandler implements ICommandHandler<MergeEntitiesCommand, void> {
  constructor(
    private readonly entityMergeService: IEntityMergeService,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: MergeEntitiesCommand): Promise<void> {
    const { sourceEntityId, targetEntityId, userId } = command;

    const mergedEntity = await this.entityMergeService.merge(sourceEntityId, targetEntityId);
    
    // Publish domain events
    await this.eventBus.publish(new EntityMergedEvent(EntityId.create(sourceEntityId), EntityId.create(targetEntityId)));

    // Audit logging
    const auditEntry = AuditEntry.create({
      action: 'MERGE_ENTITIES',
      actor: AuditActor.create({
        userId: new UserId(userId),
        actorType: 'USER',
        ipAddress: new IPAddress('127.0.0.1'),
        userAgent: new UserAgent('unknown')
      }),
      resource: AuditResource.create({
        id: new ResourceId(targetEntityId),
        type: 'ENTITY'
      }),
      metadata: [AuditMetadata.create({ key: 'status', value: 'SUCCESS' })],
      correlationId: new CorrelationId(new UniqueEntityId().toString()),
      timestamp: new Timestamp(new Date())
    });

    await this.auditRepository.log(auditEntry);
  }
}
