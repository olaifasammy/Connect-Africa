import { FindShortestPathQuery } from '../queries/FindShortestPathQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';

export class FindShortestPathHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(query: FindShortestPathQuery): Promise<GraphNode[]> {
    return await this.repository.findShortestPath(query.startEntityId, query.endEntityId);
  }
}
