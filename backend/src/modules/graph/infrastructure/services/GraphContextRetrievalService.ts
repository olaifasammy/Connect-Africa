import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IGraphContextRetrievalService } from '../../application/services/IGraphContextRetrievalService';
import { IGraphRepository } from '@modules/graph/domain/repositories/IGraphRepository';

@provide(GraphContextRetrievalService, true)
@injectable()
export class GraphContextRetrievalService implements IGraphContextRetrievalService {
  constructor(
    @inject('IGraphRepository') private readonly graphRepository: IGraphRepository
  ) {}

  async getContext(entityId: string): Promise<any> {
    // Implementation to retrieve graph context for a given entity
    return await this.graphRepository.getNeighbors(entityId);
  }
}
