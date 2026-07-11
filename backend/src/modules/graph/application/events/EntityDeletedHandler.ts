import { EntityDeletedEvent } from '@modules/entity/domain/events/EntityDeletedEvent';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';

export class EntityDeletedHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(event: EntityDeletedEvent): Promise<void> {
    await this.repository.deleteNode(event.entityId.value);
  }
}
