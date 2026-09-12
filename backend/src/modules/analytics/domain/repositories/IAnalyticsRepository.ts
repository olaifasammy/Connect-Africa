import { SystemMetric } from '../entities/SystemMetric';

export interface AnalyticsFilters {
  startDate?: Date;
  endDate?: Date;
}

export interface IAnalyticsRepository {
  save(metric: SystemMetric): Promise<void>;
  getMetricsByContext(context: string, filters?: AnalyticsFilters): Promise<SystemMetric[]>;
}
