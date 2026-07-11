import { TraverseGraphQuery } from '../queries/TraverseGraphQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';

export class TraverseGraphHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(query: TraverseGraphQuery): Promise<GraphNode[]> {
    if (query.mode === 'depth') {
        return await this.repository.depthTraversal(query.entityId, query.maxDepth);
    }
    return await this.repository.breadthTraversal(query.entityId, query.maxDepth);
  }
}
