import { Request, Response } from 'express';
import { PrometheusMetricsProvider } from '@infrastructure/monitoring/PrometheusMetricsProvider';

export class MetricsController {
  constructor(private metricsProvider: PrometheusMetricsProvider) {}

  async getMetrics(req: Request, res: Response): Promise<void> {
    const metrics = await this.metricsProvider.getMetrics();
    res.set('Content-Type', 'text/plain');
    res.send(metrics);
  }
}
