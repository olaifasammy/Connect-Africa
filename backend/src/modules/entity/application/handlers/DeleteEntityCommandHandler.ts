import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { DeleteEntityCommand } from '@modules/entity/application/commands/DeleteEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityDeletedEvent } from '@modules/entity/domain/events/EntityDeletedEvent';

export class DeleteEntityCommandHandler implements ICommandHandler<DeleteEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository & { delete(id: EntityId): Promise<void> },
    private readonly auditRepository: IAuditRepository,
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
    await this.auditRepository.log({
        user: userId,
        action: 'DELETE_ENTITY',
        resource: `entity:${entityId}`,
        status: 'SUCCESS'
    });
  }
}
