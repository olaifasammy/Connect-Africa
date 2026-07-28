import { GetNodeQuery } from '../queries/GetNodeQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';

export class GetNodeHandler {
  constructor(private readonly repository: IGraphRepository) {}

  async handle(query: GetNodeQuery): Promise<GraphNode | null> {
    return await this.repository.findById(query.entityId);
  }
}
