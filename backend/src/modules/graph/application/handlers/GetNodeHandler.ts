import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { GetNodeQuery } from '../queries/GetNodeQuery';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { GraphNode } from '../../domain/entities/GraphEntities';

@provide(GetNodeHandler, true)
@injectable()
export class GetNodeHandler {
  constructor(
    @inject('IGraphRepository') private readonly repository: IGraphRepository
  ) {}

  async handle(query: GetNodeQuery): Promise<GraphNode | null> {
    return await this.repository.findById(query.entityId);
  }
}
