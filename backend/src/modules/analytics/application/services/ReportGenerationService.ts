import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { IAnalyticsRepository, AnalyticsFilters } from '../../domain/repositories/IAnalyticsRepository';

@provide(ReportGenerationService, true)
@injectable()
export class ReportGenerationService {
  constructor(
    @inject('IAnalyticsRepository') private readonly repository: IAnalyticsRepository
  ) {}

  async generateReport(context: string, filters?: AnalyticsFilters): Promise<string> {
    const metrics = await this.repository.getMetricsByContext(context, filters);
    return `Report for ${context}: ${metrics.length} metrics collected.`;
  }
}
