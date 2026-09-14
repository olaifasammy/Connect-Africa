import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { RejectEntityCommand } from '@modules/entity/application/commands/RejectEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityRejectedEvent } from '@modules/entity/domain/events/EntityRejectedEvent';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(RejectEntityCommandHandler, true)
@injectable()
export class RejectEntityCommandHandler
  implements ICommandHandler<RejectEntityCommand, void>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus
  ) {}

  @Audit('REJECT_ENTITY', 'ENTITY')
  async handle(
    command: RejectEntityCommand,
    userId?: string,
    ipAddress?: string
  ): Promise<void> {
    const id = EntityId.create(command.entityId);
    const entity = await this.entityRepository.findById(id);

    if (!entity) {
      throw new Error(`Entity with ID ${command.entityId} not found.`);
    }

    entity.reject();

    await this.entityRepository.save(entity);

    await this.eventBus.publish(
      new EntityRejectedEvent(entity)
    );
  }
}
