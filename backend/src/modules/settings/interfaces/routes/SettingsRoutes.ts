import { Router } from 'express';
import { SettingsController } from '../controllers/SettingsController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';

export const settingsRoutes = (controller: SettingsController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();
  router.use(authMiddleware.authenticate);

  router.patch('/theme', (req, res) => controller.changeTheme(req, res));
  
  return router;
};
