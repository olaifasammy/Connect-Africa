import { EntityUpdatedEvent } from '@modules/entity/domain/events/EntityUpdatedEvent';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';

export class EntityUpdatedHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(event: EntityUpdatedEvent): Promise<void> {
    await this.repository.updateNode(event.entity.entityId.toString(), event.entity.metadata.getProps());
  }
}
