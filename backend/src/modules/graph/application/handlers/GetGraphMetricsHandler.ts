import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';

@provide(GetGraphMetricsHandler, true)
@injectable()
export class GetGraphMetricsHandler {
  constructor(
    @inject('IGraphRepository') private readonly repository: IGraphRepository
  ) {}

  async handle(): Promise<{ nodeCount: number; edgeCount: number }> {
    const nodeCount = await this.repository.countNodes();
    const edgeCount = await this.repository.countEdges();
    return { nodeCount, edgeCount };
  }
}
