"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createArticleRoutes = createArticleRoutes;
const express_1 = require("express");
const ZodValidationMiddleware_1 = require("../../../../shared/interfaces/http/middleware/ZodValidationMiddleware");
const ArticleValidators_1 = require("../../application/validators/ArticleValidators");
const AuthorizationMiddleware_1 = require("../../../../shared/interfaces/http/middleware/AuthorizationMiddleware");
const Permissions_1 = require("../../../auth/domain/policies/rbac/Permissions");
const RateLimitMiddleware_1 = require("../../../../shared/interfaces/http/middleware/RateLimitMiddleware");
function createArticleRoutes(controller, authMiddleware) {
    const router = (0, express_1.Router)();
    const authenticate = authMiddleware.authenticate;
    router.post('/', authenticate, RateLimitMiddleware_1.authRateLimiter, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.ARTICLE_CREATE), (0, ZodValidationMiddleware_1.validate)(ArticleValidators_1.CreateArticleSchema), (req, res) => controller.create(req, res));
    router.put('/:id', authenticate, RateLimitMiddleware_1.authRateLimiter, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.ARTICLE_UPDATE), (0, ZodValidationMiddleware_1.validate)(ArticleValidators_1.UpdateArticleSchema), (req, res) => controller.update(req, res));
    router.delete('/:id', authenticate, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.ARTICLE_DELETE), (req, res) => controller.delete(req, res));
    router.post('/:id/publish', authenticate, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.ARTICLE_PUBLISH), (req, res) => controller.publish(req, res));
    router.post('/:id/archive', authenticate, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.ARTICLE_UPDATE), (req, res) => controller.archive(req, res));
    router.post('/:id/submit', authenticate, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.ARTICLE_UPDATE), (req, res) => controller.submitForReview(req, res));
    router.post('/:id/approve', authenticate, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.ARTICLE_APPROVE), (req, res) => controller.approve(req, res));
    return router;
}
//# sourceMappingURL=ArticleRoutes.js.map