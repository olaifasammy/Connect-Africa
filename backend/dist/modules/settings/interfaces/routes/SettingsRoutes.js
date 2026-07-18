"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRoutes = void 0;
const express_1 = require("express");
const SettingsValidationMiddleware_1 = require("../middleware/SettingsValidationMiddleware");
const SettingsValidation_1 = require("../validation/SettingsValidation");
const settingsRoutes = (controller, authMiddleware) => {
    const router = (0, express_1.Router)();
    router.use(authMiddleware.authenticate);
    router.get('/', (req, res) => controller.getSettings(req, res));
    router.put('/', (0, SettingsValidationMiddleware_1.validate)(SettingsValidation_1.UpdateSettingsDtoSchema), (req, res) => controller.updateSettings(req, res));
    router.patch('/theme', (0, SettingsValidationMiddleware_1.validate)(SettingsValidation_1.ChangeThemeDtoSchema), (req, res) => controller.changeTheme(req, res));
    router.patch('/language', (req, res) => controller.updateLanguage(req, res));
    router.patch('/privacy', (req, res) => controller.updatePrivacy(req, res));
    router.patch('/notifications', (req, res) => controller.updateNotificationSettings(req, res));
    router.patch('/security', (req, res) => controller.updateSecuritySettings(req, res));
    router.post('/reset', (req, res) => controller.resetSettings(req, res));
    return router;
};
exports.settingsRoutes = settingsRoutes;
//# sourceMappingURL=SettingsRoutes.js.map