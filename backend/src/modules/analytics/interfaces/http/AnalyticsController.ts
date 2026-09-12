import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { MetricsAggregationService } from '../../application/services/MetricsAggregationService';
import { ReportGenerationService } from '../../application/services/ReportGenerationService';

@provide(AnalyticsController, true)
@injectable()
export class AnalyticsController {
  constructor(
    @inject(MetricsAggregationService) private readonly metricsService: MetricsAggregationService,
    @inject(ReportGenerationService) private readonly reportService: ReportGenerationService
  ) {}

  async getMetrics(req: Request, res: Response): Promise<void> {
    const context = Array.isArray(req.params.context) ? req.params.context[0] : req.params.context;
    const filters = {
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined
    };
    const metrics = await this.metricsService.getContextMetrics(context, filters);
    res.status(200).json({ success: true, data: metrics });
  }

  async generateReport(req: Request, res: Response): Promise<void> {
    const context = Array.isArray(req.params.context) ? req.params.context[0] : req.params.context;
    const filters = {
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined
    };
    const report = await this.reportService.generateReport(context, filters);
    res.status(200).json({ success: true, data: report });
  }
}
