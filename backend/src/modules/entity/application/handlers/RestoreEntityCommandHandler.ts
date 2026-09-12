import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RestoreEntityCommand } from '@modules/entity/application/commands/RestoreEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityRestoredEvent } from '@modules/entity/domain/events/EntityRestoredEvent';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(RestoreEntityCommandHandler, true)
@injectable()
export class RestoreEntityCommandHandler
  implements ICommandHandler<RestoreEntityCommand, void>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus
  ) {}

  @Audit('RESTORE_ENTITY', 'ENTITY')
  async handle(
    command: RestoreEntityCommand,
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

    entity.restore();

    await this.entityRepository.save(entity);

    await this.eventBus.publish(
      new EntityRestoredEvent(entity)
    );
  }
}
