"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const ZodValidationMiddleware_1 = require("../../../../../../shared/interfaces/http/middleware/ZodValidationMiddleware");
const AuthSchemas_1 = require("../../../../../../shared/interfaces/http/schemas/AuthSchemas");
const AuthorizationMiddleware_1 = require("../../../../../../shared/interfaces/http/middleware/AuthorizationMiddleware");
const Permissions_1 = require("../../../../../auth/domain/policies/rbac/Permissions");
const RateLimitMiddleware_1 = require("../../../../../../shared/interfaces/http/middleware/RateLimitMiddleware");
const authRoutes = (authController, authMiddleware) => {
    const router = (0, express_1.Router)();
    router.post('/register', RateLimitMiddleware_1.authRateLimiter, (0, ZodValidationMiddleware_1.validate)(AuthSchemas_1.RegisterSchema), (req, res) => authController.register(req, res));
    router.post('/login', RateLimitMiddleware_1.authRateLimiter, (0, ZodValidationMiddleware_1.validate)(AuthSchemas_1.LoginSchema), (req, res) => authController.login(req, res));
    router.post('/logout', authMiddleware.authenticate, (0, AuthorizationMiddleware_1.authorize)(Permissions_1.Permission.SESSION_MANAGE), (req, res) => authController.logout(req, res));
    router.post('/refresh', authMiddleware.authenticate, (0, ZodValidationMiddleware_1.validate)(AuthSchemas_1.RefreshSchema), (req, res) => authController.refresh(req, res));
    router.post('/reset-password', RateLimitMiddleware_1.authRateLimiter, (0, ZodValidationMiddleware_1.validate)(AuthSchemas_1.ResetPasswordSchema), (req, res) => authController.resetPassword(req, res));
    router.post('/verify-email', RateLimitMiddleware_1.authRateLimiter, (0, ZodValidationMiddleware_1.validate)(AuthSchemas_1.VerifyEmailSchema), (req, res) => authController.verifyEmail(req, res));
    router.put('/profile', authMiddleware.authenticate, (0, ZodValidationMiddleware_1.validate)(AuthSchemas_1.UpdateProfileSchema), (req, res) => authController.updateProfile(req, res));
    return router;
};
exports.authRoutes = authRoutes;
//# sourceMappingURL=authRoutes.js.map