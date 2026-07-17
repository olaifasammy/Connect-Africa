import { EntityDeletedEvent } from '@modules/entity/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';

export class EntityDeletedHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(event: EntityDeletedEvent): Promise<void> {
    await this.repository.deleteNode(event.entityId.value);
  }
}
