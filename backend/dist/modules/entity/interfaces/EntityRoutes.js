"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEntityRoutes = void 0;
const express_1 = require("express");
const AuthorizationMiddleware_1 = require("../../../shared/interfaces/http/middleware/AuthorizationMiddleware");
const ZodValidationMiddleware_1 = require("../../../shared/interfaces/http/middleware/ZodValidationMiddleware");
const MetricsMiddleware_1 = require("../../../shared/interfaces/http/middleware/MetricsMiddleware");
const CreateEntityRequest_1 = require("../../entity/application/dto/CreateEntityRequest");
const UpdateEntityRequest_1 = require("../../entity/application/dto/UpdateEntityRequest");
const public_1 = require("../../auth/public");
const createEntityRoutes = (controller, authMiddleware) => {
    const router = (0, express_1.Router)();
    // Apply Metrics
    router.use(MetricsMiddleware_1.metricsMiddleware);
    // Apply Auth to all routes
    router.use(authMiddleware.authenticate);
    router.post('/', (0, AuthorizationMiddleware_1.authorize)(public_1.Permission.USER_WRITE), (0, ZodValidationMiddleware_1.validate)(CreateEntityRequest_1.CreateEntitySchema), (req, res) => controller.create(req, res));
    router.put('/:id', (0, AuthorizationMiddleware_1.authorize)(public_1.Permission.USER_WRITE), (0, ZodValidationMiddleware_1.validate)(UpdateEntityRequest_1.UpdateEntitySchema), (req, res) => controller.update(req, res));
    router.delete('/:id', (0, AuthorizationMiddleware_1.authorize)(public_1.Permission.USER_WRITE), (req, res) => controller.delete(req, res));
    router.post('/:id/publish', (0, AuthorizationMiddleware_1.authorize)(public_1.Permission.USER_WRITE), (req, res) => controller.publish(req, res));
    router.post('/:id/archive', (0, AuthorizationMiddleware_1.authorize)(public_1.Permission.USER_WRITE), (req, res) => controller.archive(req, res));
    router.post('/:id/restore', (0, AuthorizationMiddleware_1.authorize)(public_1.Permission.USER_WRITE), (req, res) => controller.restore(req, res));
    router.post('/merge', (0, AuthorizationMiddleware_1.authorize)(public_1.Permission.USER_WRITE), (req, res) => controller.merge(req, res));
    router.post('/:id/alias', (0, AuthorizationMiddleware_1.authorize)(public_1.Permission.USER_WRITE), (req, res) => controller.addAlias(req, res));
    router.delete('/:id/alias', (0, AuthorizationMiddleware_1.authorize)(public_1.Permission.USER_WRITE), (req, res) => controller.removeAlias(req, res));
    router.post('/:id/version', (0, AuthorizationMiddleware_1.authorize)(public_1.Permission.USER_WRITE), (req, res) => controller.createVersion(req, res));
    return router;
};
exports.createEntityRoutes = createEntityRoutes;
//# sourceMappingURL=EntityRoutes.js.map