import { Router } from 'express';
import { MetricsController } from '../../controllers/MetricsController';
import { PrometheusMetricsProvider } from '@infrastructure/monitoring/PrometheusMetricsProvider';

export const metricsRoutes = (metricsProvider: PrometheusMetricsProvider) => {
  const router = Router();
  const controller = new MetricsController(metricsProvider);
  router.get('/metrics', (req, res) => controller.getMetrics(req, res));
  return router;
};
