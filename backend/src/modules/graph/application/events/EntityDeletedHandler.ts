import { injectable, inject } from 'inversify';
import { EntityDeletedEvent } from '@modules/entity/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';

@injectable()
export class EntityDeletedHandler {
  constructor(@inject('IGraphRepository') private readonly repository: IGraphRepository) {}

  async handle(event: EntityDeletedEvent): Promise<void> {
    await this.repository.deleteNode(event.entityId.value);
  }
}
