import { SystemMetric } from '../entities/SystemMetric';

export interface AnalyticsFilters {
  startDate?: Date;
  endDate?: Date;
  eventName?: string;
  limit?: number;
  offset?: number;
}

export interface IAnalyticsRepository {
  save(metric: SystemMetric): Promise<void>;
  getMetricsByContext(context: string, filters?: AnalyticsFilters): Promise<SystemMetric[]>;
}
