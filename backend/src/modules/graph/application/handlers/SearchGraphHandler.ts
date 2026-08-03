import { SearchGraphQuery } from '../queries/SearchGraphQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';

export class SearchGraphHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(query: SearchGraphQuery): Promise<GraphNode[]> {
    if (query.label) {
        return await this.repository.findByLabel(query.label, query.limit, query.offset);
    }
    return []; // Simplified for now
  }
}
