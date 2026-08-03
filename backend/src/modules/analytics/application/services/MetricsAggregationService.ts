import { injectable, inject } from 'inversify';
import { IAnalyticsRepository } from '../../domain/repositories/IAnalyticsRepository';
import { SystemMetric } from '../../domain/entities/SystemMetric';

@injectable()
export class MetricsAggregationService {
  constructor(
    @inject('IAnalyticsRepository') private readonly repository: IAnalyticsRepository
  ) {}

  async getContextMetrics(context: string): Promise<SystemMetric[]> {
    return await this.repository.getMetricsByContext(context);
  }
}
