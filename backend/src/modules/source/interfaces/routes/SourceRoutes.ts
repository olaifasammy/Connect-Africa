import { Router } from 'express';
import { SourceController } from '../controllers/SourceController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { CreateSourceSchema } from '../../application/validators/SourceValidators';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';
import { authRateLimiter } from '@shared/interfaces/http/middleware/RateLimitMiddleware';

export function createSourceRoutes(controller: SourceController, authMiddleware: AuthenticationMiddleware): Router {
  const router = Router();
  const authenticate = authMiddleware.authenticate;

  router.post('/', authenticate, authRateLimiter, authorize(Permission.SOURCE_CREATE), validate(CreateSourceSchema), (req, res) => controller.create(req, res));
  router.get('/:id', authenticate, authorize(Permission.SOURCE_READ), (req, res) => controller.get(req, res));

  return router;
}
