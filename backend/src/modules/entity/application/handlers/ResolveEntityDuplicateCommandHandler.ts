import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ResolveEntityDuplicateCommand } from '../commands/ResolveEntityDuplicateCommand';
import { IEntityMergeService } from '@modules/entity/domain/services/IEntityMergeService';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityMergedEvent } from '@modules/entity/domain/events/EntityMergedEvent';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';
import { IAuditLogger } from '@modules/auth/domain/interfaces/IAuditLogger';

@provide(ResolveEntityDuplicateCommandHandler, true)
@injectable()
export class ResolveEntityDuplicateCommandHandler
  implements ICommandHandler<ResolveEntityDuplicateCommand, void>
{
  constructor(
    @inject('IEntityMergeService')
    private readonly entityMergeService: IEntityMergeService,

    @inject('EventBus')
    private readonly eventBus: EventBus,

    @inject('IAuditLogger')
    private readonly auditLogger: IAuditLogger,
  ) {}

  @Audit('RESOLVE_ENTITY_DUPLICATE', 'ENTITY')
  async handle(
    command: ResolveEntityDuplicateCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<void> {
    const { sourceEntityId, duplicateEntityId, action } = command;

    if (action === 'MERGE') {
      // Re-use core merge logic
      await this.entityMergeService.merge(sourceEntityId, duplicateEntityId);

      // Publish merged event
      await this.eventBus.publish(
        new EntityMergedEvent(
          EntityId.create(sourceEntityId),
          EntityId.create(duplicateEntityId),
        ),
      );

      this.auditLogger.log({
        user: userId || 'system',
        action: 'ENTITY_DUPLICATE_MERGED',
        resource: 'Entity',
        status: 'SUCCESS',
        ipAddress: ipAddress || 'unknown',
      });
    } else {
      // DISMISS: log the dismissal so the audit system has record of the manual bypass
      this.auditLogger.log({
        user: userId || 'system',
        action: 'ENTITY_DUPLICATE_DISMISSED',
        resource: 'Entity',
        status: 'SUCCESS',
        ipAddress: ipAddress || 'unknown',
      });
    }
  }
}
