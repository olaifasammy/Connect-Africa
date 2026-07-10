import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RestoreEntityCommand } from '@modules/entity/application/commands/RestoreEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityRestoredEvent } from '@modules/entity/domain/events/EntityRestoredEvent';

export class RestoreEntityCommandHandler implements ICommandHandler<RestoreEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly auditRepository: IAuditRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: RestoreEntityCommand): Promise<void> {
    const { entityId, userId } = command;
    const id = EntityId.create(entityId);

    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new Error(`Entity with ID ${entityId} not found.`);
    }

    // Trigger Restore event
    await this.eventBus.publish(new EntityRestoredEvent(entity));

    // Audit logging
    await this.auditRepository.log({
        user: userId,
        action: 'RESTORE_ENTITY',
        resource: `entity:${entityId}`,
        status: 'SUCCESS'
    });
  }
}
