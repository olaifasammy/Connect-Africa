import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { MergeEntitiesCommand } from '@modules/entity/application/commands/MergeEntitiesCommand';
import { IEntityMergeService } from '@modules/entity/domain/services/IEntityMergeService';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityMergedEvent } from '@modules/entity/domain/events/EntityMergedEvent';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';

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
    await this.auditRepository.log({
        user: userId,
        action: 'MERGE_ENTITIES',
        resource: `entity:${targetEntityId}`,
        status: 'SUCCESS'
    });
  }
}
