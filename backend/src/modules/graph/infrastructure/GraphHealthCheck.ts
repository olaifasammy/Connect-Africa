import { inject } from 'inversify';
import { IGraphRepository } from '../domain/repositories/IGraphRepository';

export class GraphHealthCheck {
  constructor(
    @inject('IGraphRepository') private readonly repository: IGraphRepository
  ) {}

  async check(): Promise<{ status: 'UP' | 'DOWN'; message?: string }> {
    try {
      await this.repository.countNodes();
      return { status: 'UP' };
    } catch (error) {
      return { status: 'DOWN', message: 'Graph database connectivity issue' };
    }
  }
}
