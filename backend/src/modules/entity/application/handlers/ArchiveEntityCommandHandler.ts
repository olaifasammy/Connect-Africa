import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ArchiveEntityCommand } from '@modules/entity/application/commands/ArchiveEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityArchivedEvent } from '@modules/entity/domain/events/EntityArchivedEvent';

export class ArchiveEntityCommandHandler implements ICommandHandler<ArchiveEntityCommand, void> {
  constructor(
    private readonly entityRepository: IEntityRepository,
    private readonly auditRepository: IAuditRepository,
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

    // Audit logging
    await this.auditRepository.log({
        user: userId,
        action: 'ARCHIVE_ENTITY',
        resource: `entity:${entityId}`,
        status: 'SUCCESS'
    });
  }
}
