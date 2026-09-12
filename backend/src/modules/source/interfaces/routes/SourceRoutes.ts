import { Router } from 'express';
import { SourceController } from '../controllers/SourceController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { CreateSourceSchema, UpdateSourceSchema, DeleteSourceSchema } from '../../application/validators/SourceValidators';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/public';
import { authRateLimiter } from '@shared/interfaces/http/middleware/RateLimitMiddleware';

export function createSourceRoutes(controller: SourceController, authMiddleware: AuthenticationMiddleware): Router {
  const router = Router();
  const authenticate = authMiddleware.authenticate;

  router.post('/', authenticate, authRateLimiter, authorize(Permission.SOURCE_CREATE), validate(CreateSourceSchema), (req, res) => controller.create(req, res));
  router.get('/', authenticate, authorize(Permission.SOURCE_READ), (req, res) => controller.list(req, res));
  router.get('/:id', authenticate, authorize(Permission.SOURCE_READ), (req, res) => controller.get(req, res));
  router.put('/:id', authenticate, authorize(Permission.SOURCE_UPDATE), validate(UpdateSourceSchema), (req, res) => controller.update(req, res));
  router.delete('/:id', authenticate, authorize(Permission.SOURCE_DELETE), validate(DeleteSourceSchema), (req, res) => controller.delete(req, res));

  return router;
}
