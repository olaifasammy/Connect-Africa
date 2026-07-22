import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RestoreEntityCommand } from '@modules/entity/application/commands/RestoreEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityRestoredEvent } from '@modules/entity/domain/events/EntityRestoredEvent';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';

export class RestoreEntityCommandHandler implements ICommandHandler<RestoreEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
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
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'RESTORE_ENTITY',
      actorId: userId,
      actorType: 'USER',
      ipAddress: '127.0.0.1',
      userAgent: 'unknown',
      resourceId: entityId,
      resourceType: 'ENTITY',
      metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));
  }
}
