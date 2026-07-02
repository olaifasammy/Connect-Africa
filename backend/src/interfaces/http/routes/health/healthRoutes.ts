import { Router } from 'express';
import { HealthController } from '../../controllers/HealthController';

export const healthRoutes = () => {
  const router = Router();
  const controller = new HealthController();
  router.get('/health', (req, res) => controller.getHealth(req, res));
  router.get('/ready', (req, res) => controller.getHealth(req, res));
  router.get('/live', (req, res) => controller.getHealth(req, res));
  return router;
};
