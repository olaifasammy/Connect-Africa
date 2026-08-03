import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { MetricsAggregationService } from '../../application/services/MetricsAggregationService';
import { ReportGenerationService } from '../../application/services/ReportGenerationService';

@injectable()
export class AnalyticsController {
  constructor(
    @inject(MetricsAggregationService) private readonly metricsService: MetricsAggregationService,
    @inject(ReportGenerationService) private readonly reportService: ReportGenerationService
  ) {}

  async getMetrics(req: Request, res: Response): Promise<void> {
    const context = Array.isArray(req.params.context) ? req.params.context[0] : req.params.context;
    const metrics = await this.metricsService.getContextMetrics(context);
    res.status(200).json({ success: true, data: metrics });
  }

  async generateReport(req: Request, res: Response): Promise<void> {
    const context = Array.isArray(req.params.context) ? req.params.context[0] : req.params.context;
    const report = await this.reportService.generateReport(context);
    res.status(200).json({ success: true, data: report });
  }
}
