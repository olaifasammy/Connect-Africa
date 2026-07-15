import { IGraphRepository } from '@modules/graph/domain/repositories/IGraphRepository';
import { injectable, inject } from 'inversify';

export interface GraphSearchQuery {
  type: 'neighbors' | 'path' | 'chain';
  entityId?: string;
  startEntityId?: string;
  endEntityId?: string;
  maxDepth?: number;
}

export interface GraphSearchResult {
  nodes: any[];
  edges: any[];
}

@injectable()
export class GraphSearchHandler {
  constructor(
    @inject('IGraphRepository') private readonly graphRepository: IGraphRepository
  ) {}

  async handle(query: GraphSearchQuery): Promise<GraphSearchResult> {
    switch (query.type) {
      case 'neighbors':
        if (!query.entityId) throw new Error('entityId is required for neighbors search');
        return await this.graphRepository.getNeighbors(query.entityId);
      case 'path':
        if (!query.startEntityId || !query.endEntityId) throw new Error('startEntityId and endEntityId are required for path search');
        const pathNodes = await this.graphRepository.findShortestPath(query.startEntityId, query.endEntityId);
        return { nodes: pathNodes, edges: [] }; // Edges not supported in findShortestPath yet
      default:
        throw new Error(`Unsupported graph search type: ${query.type}`);
    }
  }
}
