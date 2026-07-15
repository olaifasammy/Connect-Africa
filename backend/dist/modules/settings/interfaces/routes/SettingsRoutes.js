"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsRoutes = void 0;
const express_1 = require("express");
const settingsRoutes = (controller, authMiddleware) => {
    const router = (0, express_1.Router)();
    router.use(authMiddleware.authenticate);
    router.patch('/theme', (req, res) => controller.changeTheme(req, res));
    return router;
};
exports.settingsRoutes = settingsRoutes;
//# sourceMappingURL=SettingsRoutes.js.map