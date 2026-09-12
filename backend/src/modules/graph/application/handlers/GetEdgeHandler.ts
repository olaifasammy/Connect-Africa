import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { GetEdgeQuery } from '../queries/GetEdgeQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphEdge } from '../../domain/entities/GraphEntities';

@provide(GetEdgeHandler, true)
@injectable()
export class GetEdgeHandler {
  constructor(
    @inject('IGraphRepository') private readonly repository: IGraphRepository
  ) {}

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
