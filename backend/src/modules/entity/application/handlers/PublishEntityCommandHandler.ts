import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { PublishEntityCommand } from '@modules/entity/application/commands/PublishEntityCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntityPublishedEvent } from '@modules/entity/domain/events/EntityPublishedEvent';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(PublishEntityCommandHandler, true)
@injectable()
export class PublishEntityCommandHandler
  implements ICommandHandler<PublishEntityCommand, void>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus
  ) {}

  @Audit('PUBLISH_ENTITY', 'ENTITY')
  async handle(
    command: PublishEntityCommand,
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

    entity.publish();

    await this.entityRepository.save(entity);

    await this.eventBus.publish(
      new EntityPublishedEvent(entity)
    );
  }
}
