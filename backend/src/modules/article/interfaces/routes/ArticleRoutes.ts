import { Router } from 'express';
import { ArticleController } from '../controllers/ArticleController';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { CreateArticleSchema, UpdateArticleSchema } from '../../application/validators/ArticleValidators';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';
import { authRateLimiter } from '@shared/interfaces/http/middleware/RateLimitMiddleware';

export function createArticleRoutes(controller: ArticleController, authMiddleware: AuthenticationMiddleware): Router {
  const router = Router();
  const authenticate = authMiddleware.authenticate;

  router.post('/', authenticate, authRateLimiter, authorize(Permission.ARTICLE_CREATE), validate(CreateArticleSchema), (req, res) => controller.create(req, res));
  router.put('/:id', authenticate, authRateLimiter, authorize(Permission.ARTICLE_UPDATE), validate(UpdateArticleSchema), (req, res) => controller.update(req, res));
  router.delete('/:id', authenticate, authorize(Permission.ARTICLE_DELETE), (req, res) => controller.delete(req, res));
  router.post('/:id/publish', authenticate, authorize(Permission.ARTICLE_PUBLISH), (req, res) => controller.publish(req, res));
  router.post('/:id/archive', authenticate, authorize(Permission.ARTICLE_UPDATE), (req, res) => controller.archive(req, res));
  router.post('/:id/submit', authenticate, authorize(Permission.ARTICLE_UPDATE), (req, res) => controller.submitForReview(req, res));
  router.post('/:id/approve', authenticate, authorize(Permission.ARTICLE_APPROVE), (req, res) => controller.approve(req, res));

  return router;
}
