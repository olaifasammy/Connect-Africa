import { injectable, inject } from 'inversify';
import { EntityUpdatedEvent } from '@modules/entity/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';

@injectable()
export class EntityUpdatedHandler {
  constructor(@inject('IGraphRepository') private readonly repository: IGraphRepository) {}

  async handle(event: EntityUpdatedEvent): Promise<void> {
    await this.repository.updateNode(event.entity.entityId.toString(), event.entity.metadata.getProps());
  }
}
