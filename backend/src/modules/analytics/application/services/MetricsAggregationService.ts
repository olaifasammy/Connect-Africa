import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IAnalyticsRepository, AnalyticsFilters } from '../../domain/repositories/IAnalyticsRepository';
import { SystemMetric } from '../../domain/entities/SystemMetric';

@provide(MetricsAggregationService, true)
@injectable()
export class MetricsAggregationService {
  constructor(
    @inject('IAnalyticsRepository') private readonly repository: IAnalyticsRepository
  ) {}

  async getContextMetrics(context: string, filters?: AnalyticsFilters): Promise<SystemMetric[]> {
    return await this.repository.getMetricsByContext(context, filters);
  }
}
