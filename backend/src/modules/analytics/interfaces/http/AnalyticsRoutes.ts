import { Router } from 'express';
import { AnalyticsController } from './AnalyticsController';
import { Container } from 'inversify';

export const AnalyticsRoutes = (container: Container) => {
  const router = Router();
  const controller = container.resolve(AnalyticsController);

  router.get('/metrics/:context', controller.getMetrics.bind(controller));
  router.get('/report/:context', controller.generateReport.bind(controller));

  return router;
};
