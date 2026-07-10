import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { PublishEntityCommand } from '@modules/entity/application/commands/PublishEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityPublishedEvent } from '@modules/entity/domain/events/EntityPublishedEvent';

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
    await this.auditRepository.log({
        user: userId,
        action: 'PUBLISH_ENTITY',
        resource: `entity:${entityId}`,
        status: 'SUCCESS'
    });
  }
}
