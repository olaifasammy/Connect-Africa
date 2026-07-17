import { Router } from 'express';
import { SettingsController } from '../controllers/SettingsController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { validate } from '../middleware/SettingsValidationMiddleware';
import { ChangeThemeDtoSchema, UpdateSettingsDtoSchema } from '../validation/SettingsValidation';

export const settingsRoutes = (controller: SettingsController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();
  router.use(authMiddleware.authenticate);

  router.get('/', (req, res) => controller.getSettings(req, res));
  router.put('/', validate(UpdateSettingsDtoSchema), (req, res) => controller.updateSettings(req, res));
  router.patch('/theme', validate(ChangeThemeDtoSchema), (req, res) => controller.changeTheme(req, res));
  router.patch('/language', (req, res) => controller.updateLanguage(req, res));
  router.patch('/privacy', (req, res) => controller.updatePrivacy(req, res));
  router.patch('/notifications', (req, res) => controller.updateNotificationSettings(req, res));
  router.patch('/security', (req, res) => controller.updateSecuritySettings(req, res));
  router.post('/reset', (req, res) => controller.resetSettings(req, res));
  
  return router;
};
