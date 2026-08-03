import { IGraphRepository } from '../repositories/IGraphRepository';
import { GraphNode } from '../entities/GraphEntities';

export class TraversalService {
  constructor(private readonly graphRepository: IGraphRepository) {}

  async getContextualNeighbors(entityId: string): Promise<GraphNode[]> {
    const { nodes } = await this.graphRepository.getNeighbors(entityId);
    return nodes;
  }
}
