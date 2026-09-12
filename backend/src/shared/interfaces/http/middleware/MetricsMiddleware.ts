import { Request, Response, NextFunction } from 'express';
import { IMetricsProvider } from '@shared/monitoring/IMetricsProvider';

export const metricsMiddleware = (metricsProvider: IMetricsProvider) => (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    metricsProvider.incrementCounter('http_requests_total', { method: req.method, route: req.route?.path || req.path, status: res.statusCode.toString() });
    metricsProvider.observeDuration('http_request_duration_seconds', duration / 1000, { method: req.method, route: req.route?.path || req.path });
  });
  next();
};
