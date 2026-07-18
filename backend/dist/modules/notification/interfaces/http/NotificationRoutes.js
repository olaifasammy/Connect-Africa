"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = require("express");
const NotificationController_1 = require("./NotificationController");
const router = (0, express_1.Router)();
exports.NotificationRoutes = router;
const controller = new NotificationController_1.NotificationController();
router.post('/', controller.send);
//# sourceMappingURL=NotificationRoutes.js.map