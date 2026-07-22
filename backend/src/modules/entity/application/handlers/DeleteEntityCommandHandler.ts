import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { DeleteEntityCommand } from '@modules/entity/application/commands/DeleteEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityDeletedEvent } from '@modules/entity/domain/events/EntityDeletedEvent';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';

export class DeleteEntityCommandHandler implements ICommandHandler<DeleteEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository & { delete(id: EntityId): Promise<void> },
    private readonly eventBus: EventBus
  ) {}

  async handle(command: DeleteEntityCommand): Promise<void> {
    const { entityId, userId } = command;
    const id = EntityId.create(entityId);

    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new Error(`Entity with ID ${entityId} not found.`);
    }

    await this.entityRepository.delete(id);
    
    // Publish domain events
    await this.eventBus.publish(new EntityDeletedEvent(id));

    // Audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'DELETE_ENTITY',
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
