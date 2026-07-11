"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSourceRoutes = createSourceRoutes;
const express_1 = require("express");
const ZodValidationMiddleware_1 = require("../../../../shared/interfaces/http/middleware/ZodValidationMiddleware");
const SourceValidators_1 = require("../../application/validators/SourceValidators");
const AuthorizationMiddleware_1 = require("../../../../shared/interfaces/http/middleware/AuthorizationMiddleware");
const Permissions_1 = require("../../../auth/domain/policies/rbac/Permissions");
const RateLimitMiddleware_1 = require("../../../../shared/interfaces/http/middleware/RateLimitMiddleware");
function createSourceRoutes(controller, authMiddleware) {
    const router = (0, express_1.Router)();
    const authenticate = authMiddleware.authenticate;
    router.post('/', authenticate, RateLimitMiddleware_1.authRateLimiter, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.SOURCE_CREATE), (0, ZodValidationMiddleware_1.validate)(SourceValidators_1.CreateSourceSchema), (req, res) => controller.create(req, res));
    router.get('/:id', authenticate, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.SOURCE_READ), (req, res) => controller.get(req, res));
    return router;
}
//# sourceMappingURL=SourceRoutes.js.map