import { IGraphContextRetrievalService } from '../../application/services/IGraphContextRetrievalService';
import { IGraphRepository } from '@modules/graph/domain/repositories/IGraphRepository';

export class GraphContextRetrievalService implements IGraphContextRetrievalService {
  constructor(private readonly graphRepository: IGraphRepository) {}

  async getContext(entityId: string): Promise<any> {
    // Implementation to retrieve graph context for a given entity
    return await this.graphRepository.getNeighbors(entityId);
  }
}
