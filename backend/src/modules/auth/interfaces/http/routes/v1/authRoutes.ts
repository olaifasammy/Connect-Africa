import { Router } from 'express';
import { AuthController } from '@modules/auth/interfaces/AuthController';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { LoginSchema, RefreshSchema, RegisterSchema, ResetPasswordSchema, VerifyEmailSchema } from '@shared/interfaces/http/schemas/AuthSchemas';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';
import { authRateLimiter } from '@shared/interfaces/http/middleware/RateLimitMiddleware';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';

export const authRoutes = (authController: AuthController, authMiddleware: AuthenticationMiddleware) => {
  const router = Router();
  router.post('/register', authRateLimiter, validate(RegisterSchema), (req, res) => authController.register(req, res));
  router.post('/login', authRateLimiter, validate(LoginSchema), (req, res) => authController.login(req, res));
  router.post('/logout', authMiddleware.authenticate, authorize(Permission.SESSION_MANAGE), (req, res) => authController.logout(req, res));
  router.post('/refresh', authMiddleware.authenticate, validate(RefreshSchema), (req, res) => authController.refresh(req, res));
  router.post('/reset-password', authRateLimiter, validate(ResetPasswordSchema), (req, res) => authController.resetPassword(req, res));
  router.post('/verify-email', authRateLimiter, validate(VerifyEmailSchema), (req, res) => authController.verifyEmail(req, res));
  return router;
};
