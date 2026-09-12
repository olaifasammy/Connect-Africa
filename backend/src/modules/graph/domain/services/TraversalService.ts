import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IGraphRepository } from '../repositories/IGraphRepository';
import { GraphNode } from '../entities/GraphEntities';

@provide(TraversalService, true)
@injectable()
export class TraversalService {
  constructor(
    @inject('IGraphRepository') private readonly graphRepository: IGraphRepository
  ) {}

  async getContextualNeighbors(entityId: string): Promise<GraphNode[]> {
    const { nodes } = await this.graphRepository.getNeighbors(entityId);
    return nodes;
  }
}
