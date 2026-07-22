import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ArchiveEntityCommand } from '@modules/entity/application/commands/ArchiveEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityArchivedEvent } from '@modules/entity/domain/events/EntityArchivedEvent';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';

export class ArchiveEntityCommandHandler implements ICommandHandler<ArchiveEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: ArchiveEntityCommand): Promise<void> {
    const { entityId, userId } = command;
    const id = EntityId.create(entityId);

    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new Error(`Entity with ID ${entityId} not found.`);
    }

    // Trigger Archive event
    await this.eventBus.publish(new EntityArchivedEvent(entity));

    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: 'ARCHIVE_ENTITY',
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
