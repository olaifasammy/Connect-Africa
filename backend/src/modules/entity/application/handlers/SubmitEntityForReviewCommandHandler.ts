import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { SubmitEntityForReviewCommand } from '@modules/entity/application/commands/SubmitEntityForReviewCommand';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { EntitySubmittedEvent } from '@modules/entity/domain/events/EntitySubmittedEvent';
import { Audit } from '@shared/infrastructure/audit/AuditDecorator';

@provide(SubmitEntityForReviewCommandHandler, true)
@injectable()
export class SubmitEntityForReviewCommandHandler
  implements ICommandHandler<SubmitEntityForReviewCommand, void>
{
  constructor(
    @inject('IEntityRepository')
    private readonly entityRepository: IEntityRepository,

    @inject('EventBus')
    private readonly eventBus: EventBus
  ) {}

  @Audit('SUBMIT_ENTITY_FOR_REVIEW', 'ENTITY')
  async handle(
    command: SubmitEntityForReviewCommand,
    userId?: string,
    ipAddress?: string
  ): Promise<void> {
    const id = EntityId.create(command.entityId);
    const entity = await this.entityRepository.findById(id);

    if (!entity) {
      throw new Error(`Entity with ID ${command.entityId} not found.`);
    }

    entity.submitForReview();

    await this.entityRepository.save(entity);

    await this.eventBus.publish(
      new EntitySubmittedEvent(entity)
    );
  }
}
