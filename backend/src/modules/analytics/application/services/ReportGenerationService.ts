import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IAnalyticsRepository, AnalyticsFilters } from '../../domain/repositories/IAnalyticsRepository';

export interface AnalyticsReport {
  context: string;
  totalMetrics: number;
  eventBreakdown: Record<string, number>;
  generatedAt: string;
  filters: {
    startDate?: string;
    endDate?: string;
    eventName?: string;
  };
}

@provide(ReportGenerationService, true)
@injectable()
export class ReportGenerationService {
  constructor(
    @inject('IAnalyticsRepository') private readonly repository: IAnalyticsRepository
  ) {}

  async generateReport(context: string, filters?: AnalyticsFilters): Promise<AnalyticsReport> {
    const metrics = await this.repository.getMetricsByContext(context, filters);
    
    const eventBreakdown: Record<string, number> = {};
    for (const metric of metrics) {
      eventBreakdown[metric.eventName] = (eventBreakdown[metric.eventName] || 0) + 1;
    }

    return {
      context,
      totalMetrics: metrics.length,
      eventBreakdown,
      generatedAt: new Date().toISOString(),
      filters: {
        startDate: filters?.startDate?.toISOString(),
        endDate: filters?.endDate?.toISOString(),
        eventName: filters?.eventName,
      }
    };
  }
}
