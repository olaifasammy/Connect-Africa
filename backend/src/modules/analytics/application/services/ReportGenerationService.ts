import { injectable, inject } from 'inversify';
import { IAnalyticsRepository } from '../../domain/repositories/IAnalyticsRepository';

@injectable()
export class ReportGenerationService {
  constructor(
    @inject('IAnalyticsRepository') private readonly repository: IAnalyticsRepository
  ) {}

  async generateReport(context: string): Promise<string> {
    const metrics = await this.repository.getMetricsByContext(context);
    return `Report for ${context}: ${metrics.length} metrics collected.`;
  }
}
