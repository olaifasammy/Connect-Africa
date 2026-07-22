import { SystemMetric } from '../entities/SystemMetric';
export interface IAnalyticsRepository {
    save(metric: SystemMetric): Promise<void>;
    getMetricsByContext(context: string): Promise<SystemMetric[]>;
}
