import { Router } from 'express';
import { AnalyticsController } from './AnalyticsController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/public';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { GetMetricsSchema, GetReportSchema, TrackMetricSchema } from './AnalyticsValidationSchemas';

export const createAnalyticsRoutes = (
  controller: AnalyticsController,
  authMiddleware: AuthenticationMiddleware
): Router => {
  const router = Router();
  router.use(authMiddleware.authenticate);

  router.post(
    '/track',
    authorize(Permission.ANALYTICS_READ),
    validate(TrackMetricSchema),
    controller.track.bind(controller)
  );

  router.get(
    '/metrics/:context',
    authorize(Permission.ANALYTICS_READ),
    validate(GetMetricsSchema),
    controller.getMetrics.bind(controller)
  );
  
  router.get(
    '/report/:context',
    authorize(Permission.ANALYTICS_READ),
    validate(GetReportSchema),
    controller.generateReport.bind(controller)
  );

  return router;
};
