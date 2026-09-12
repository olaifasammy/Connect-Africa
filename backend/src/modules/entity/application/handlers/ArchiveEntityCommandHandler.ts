import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ArchiveEntityCommand } from '@modules/entity/application/commands/ArchiveEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityArchivedEvent } from '@modules/entity/domain/events/EntityArchivedEvent';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(ArchiveEntityCommandHandler, true)
@injectable()
export class ArchiveEntityCommandHandler
  implements ICommandHandler<ArchiveEntityCommand, void>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus
  ) {}

  @Audit('ARCHIVE_ENTITY', 'ENTITY')
  async handle(
    command: ArchiveEntityCommand,
    userId?: string,
    ipAddress?: string
  ): Promise<void> {
    const id = EntityId.create(command.entityId);

    const entity = await this.entityRepository.findById(id);

    if (!entity) {
      throw new Error(
        `Entity with ID ${command.entityId} not found.`
      );
    }

    entity.archive();

    await this.entityRepository.save(entity);

    await this.eventBus.publish(
      new EntityArchivedEvent(entity)
    );
  }
}