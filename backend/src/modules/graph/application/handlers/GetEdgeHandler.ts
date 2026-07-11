import { GetEdgeQuery } from '../queries/GetEdgeQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphEdge } from '../../domain/entities/GraphEntities';

export class GetEdgeHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(query: GetEdgeQuery): Promise<GraphEdge | null> {
    const exists = await this.repository.existsEdge(
        query.sourceEntityId,
        query.targetEntityId,
        query.relationshipType
    );
    
    if (!exists) return null;
    
    return new GraphEdge(
        query.sourceEntityId,
        query.targetEntityId,
        query.relationshipType,
        {}
    );
  }
}
