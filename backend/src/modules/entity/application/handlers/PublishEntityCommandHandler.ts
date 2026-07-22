import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { PublishEntityCommand } from '@modules/entity/application/commands/PublishEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityPublishedEvent } from '@modules/entity/domain/events/EntityPublishedEvent';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';

export class PublishEntityCommandHandler implements ICommandHandler<PublishEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
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
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'PUBLISH_ENTITY',
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
