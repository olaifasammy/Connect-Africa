import { injectable, inject } from 'inversify';
import { EntityCreatedEvent } from '@modules/entity/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';

@injectable()
export class EntityCreatedHandler {
  constructor(@inject('IGraphRepository') private readonly repository: IGraphRepository) {}

  async handle(event: EntityCreatedEvent): Promise<void> {
    const existingNode = await this.repository.findById(event.entity.id.toString());
    if (!existingNode) {
      const node = new GraphNode(event.entity.id.toString(), event.entity.type, [], {});
      await this.repository.saveNode(node);
    }
  }
}
