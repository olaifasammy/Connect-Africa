import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { MergeEntitiesCommand } from '@modules/entity/application/commands/MergeEntitiesCommand';
import { IEntityMergeService } from '@modules/entity/domain/services/IEntityMergeService';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityMergedEvent } from '@modules/entity/domain/events/EntityMergedEvent';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(MergeEntitiesCommandHandler, true)
@injectable()
export class MergeEntitiesCommandHandler
  implements ICommandHandler<MergeEntitiesCommand, void>
{
  constructor(
    @inject('IEntityMergeService')
    private readonly entityMergeService: IEntityMergeService,

    @inject('EventBus')
    private readonly eventBus: EventBus
  ) {}

  @Audit('MERGE_ENTITIES', 'ENTITY')
  async handle(
    command: MergeEntitiesCommand,
    userId?: string,
    ipAddress?: string
  ): Promise<void> {
    const { sourceEntityId, targetEntityId } = command;

    const mergedEntity =
      await this.entityMergeService.merge(
        sourceEntityId,
        targetEntityId
      );

    // Publish domain events
    await this.eventBus.publish(
      new EntityMergedEvent(
        EntityId.create(sourceEntityId),
        EntityId.create(targetEntityId)
      )
    );
  }
}