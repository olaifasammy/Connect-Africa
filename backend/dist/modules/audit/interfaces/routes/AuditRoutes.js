"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuditController_1 = require("../controllers/AuditController");
const container_1 = require("../../../../bootstrap/container/container");
const router = (0, express_1.Router)();
const controller = container_1.container.get(AuditController_1.AuditController);
router.post('/', (req, res) => controller.record(req, res));
router.get('/', (req, res) => controller.search(req, res));
exports.default = router;
//# sourceMappingURL=AuditRoutes.js.map