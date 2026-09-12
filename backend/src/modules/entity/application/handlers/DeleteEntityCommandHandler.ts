import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { DeleteEntityCommand } from '@modules/entity/application/commands/DeleteEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityDeletedEvent } from '@modules/entity/domain/events/EntityDeletedEvent';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(DeleteEntityCommandHandler, true)
@injectable()
export class DeleteEntityCommandHandler
  implements ICommandHandler<DeleteEntityCommand, void>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus,
  ) {}

  @Audit('DELETE_ENTITY', 'ENTITY')
  async handle(
    command: DeleteEntityCommand,
    userId?: string,
    ipAddress?: string,
  ): Promise<void> {
    const id = EntityId.create(command.entityId);

    const entity = await this.entityRepository.findById(id);

    if (!entity) {
      throw new Error(
        `Entity with ID ${command.entityId} not found.`,
      );
    }

    if (entity.status !== 'ARCHIVED') {
      throw new Error(
        'Only archived entities can be permanently deleted.',
      );
    }

    await this.entityRepository.delete(id);

    await this.eventBus.publish(new EntityDeletedEvent(id));
  }
}