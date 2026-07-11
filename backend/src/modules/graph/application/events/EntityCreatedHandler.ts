import { EntityCreatedEvent } from '@modules/entity/domain/events/EntityCreatedEvent';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';

export class EntityCreatedHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(event: EntityCreatedEvent): Promise<void> {
    const existingNode = await this.repository.findById(event.entity.id.toString());
    if (!existingNode) {
      const node = new GraphNode(event.entity.id.toString(), event.entity.type, [], {});
      await this.repository.saveNode(node);
    }
  }
}
