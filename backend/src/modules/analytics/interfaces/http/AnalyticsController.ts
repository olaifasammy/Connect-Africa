import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { MetricsAggregationService } from '../../application/services/MetricsAggregationService';
import { ReportGenerationService } from '../../application/services/ReportGenerationService';
import { IAnalyticsRepository } from '../../domain/repositories/IAnalyticsRepository';
import { SystemMetric } from '../../domain/entities/SystemMetric';

@provide(AnalyticsController, true)
@injectable()
export class AnalyticsController {
  constructor(
    @inject(MetricsAggregationService) private readonly metricsService: MetricsAggregationService,
    @inject(ReportGenerationService) private readonly reportService: ReportGenerationService,
    @inject('IAnalyticsRepository') private readonly analyticsRepository: IAnalyticsRepository
  ) {}

  async getMetrics(req: Request, res: Response): Promise<void> {
    const context = Array.isArray(req.params.context) ? req.params.context[0] : req.params.context;
    const filters = {
        eventName: req.query.eventName as string | undefined,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        offset: req.query.offset ? Number(req.query.offset) : undefined,
    };
    const metrics = await this.metricsService.getContextMetrics(context, filters);
    res.status(200).json({ success: true, data: metrics });
  }

  async generateReport(req: Request, res: Response): Promise<void> {
    const context = Array.isArray(req.params.context) ? req.params.context[0] : req.params.context;
    const filters = {
        eventName: req.query.eventName as string | undefined,
        startDate: req.query.startDate ? new Date(req.query.startDate as string) : undefined,
        endDate: req.query.endDate ? new Date(req.query.endDate as string) : undefined
    };
    const report = await this.reportService.generateReport(context, filters);
    res.status(200).json({ success: true, data: report });
  }

  async track(req: Request, res: Response): Promise<void> {
    const { eventName, sourceContext, metadata } = req.body;
    const metric = SystemMetric.create({
      eventName,
      sourceContext,
      metadata: metadata || {}
    });
    await this.analyticsRepository.save(metric);
    res.status(201).json({ success: true, id: metric.id.toString() });
  }
}
