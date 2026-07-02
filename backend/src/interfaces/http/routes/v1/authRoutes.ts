import { Router } from 'express';
import { AuthController } from '../../controllers/AuthController';
import { validate } from '../../middleware/ZodValidationMiddleware';
import { LoginSchema, RefreshSchema } from '../../schemas/AuthSchemas';
import { authorize } from '../../middleware/AuthorizationMiddleware';
import { Permission } from '@domain/auth/policies/rbac/Permissions';

export const authRoutes = (authController: AuthController) => {
  const router = Router();
  router.post('/login', validate(LoginSchema), (req, res) => authController.login(req, res));
  router.post('/logout', authorize(Permission.SESSION_MANAGE), (req, res) => authController.logout(req, res));
  router.post('/refresh', validate(RefreshSchema), (req, res) => authController.refresh(req, res));
  return router;
};
