import { Router } from 'express';
import { SettingsController } from '../controllers/SettingsController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { validate } from '../middleware/SettingsValidationMiddleware';
import {
  ChangeThemeDtoSchema,
  UpdateSettingsDtoSchema,
  UpdateLanguageDtoSchema,
  UpdatePrivacyDtoSchema,
  UpdateNotificationSettingsDtoSchema,
  UpdateNotificationPreferenceDtoSchema,
  UpdateSecuritySettingsDtoSchema,
  ResetSettingsDtoSchema,
} from '../validation/SettingsValidation';
import { Permission } from '@modules/auth/public';

export const settingsRoutes = (
  controller: SettingsController,
  authMiddleware: AuthenticationMiddleware,
): Router => {
  const router = Router();

  /*
   * All settings belong to an authenticated account.
   */
  router.use(authMiddleware.authenticate);

  /*
   * System settings are administrative configuration.
   * Keep this authorization boundary explicit and separate
   * from personal user-settings access.
   */
  router.get(
    '/system',
    authorize(Permission.SETTINGS_SYSTEM_READ),
    (req, res) => controller.getSystemSettings(req, res),
  );

  /*
   * Personal settings: read access.
   */
  router.get(
    '/user',
    authorize(Permission.SETTINGS_READ),
    (req, res) => controller.getUserSettings(req, res),
  );

  router.get(
    '/',
    authorize(Permission.SETTINGS_READ),
    (req, res) => controller.getSettings(req, res),
  );

  /*
   * Personal settings: write access.
   */
  router.put(
    '/',
    authorize(Permission.SETTINGS_WRITE),
    validate(UpdateSettingsDtoSchema),
    (req, res) => controller.updateSettings(req, res),
  );

  router.patch(
    '/theme',
    authorize(Permission.SETTINGS_WRITE),
    validate(ChangeThemeDtoSchema),
    (req, res) => controller.changeTheme(req, res),
  );

  router.patch(
    '/language',
    authorize(Permission.SETTINGS_WRITE),
    validate(UpdateLanguageDtoSchema),
    (req, res) => controller.updateLanguage(req, res),
  );

  router.patch(
    '/privacy',
    authorize(Permission.SETTINGS_WRITE),
    validate(UpdatePrivacyDtoSchema),
    (req, res) => controller.updatePrivacy(req, res),
  );

  router.patch(
    '/notifications',
    authorize(Permission.SETTINGS_WRITE),
    validate(UpdateNotificationSettingsDtoSchema),
    (req, res) => controller.updateNotificationSettings(req, res),
  );

  router.patch(
    '/notification-preference',
    authorize(Permission.SETTINGS_WRITE),
    validate(UpdateNotificationPreferenceDtoSchema),
    (req, res) => controller.updateNotificationPreference(req, res),
  );

  router.patch(
    '/security',
    authorize(Permission.SETTINGS_WRITE),
    validate(UpdateSecuritySettingsDtoSchema),
    (req, res) => controller.updateSecuritySettings(req, res),
  );

  router.post(
    '/reset',
    authorize(Permission.SETTINGS_WRITE),
    validate(ResetSettingsDtoSchema),
    (req, res) => controller.resetSettings(req, res),
  );

  return router;
};
