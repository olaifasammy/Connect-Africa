import { Router } from 'express';
import { ArticleController } from '../controllers/ArticleController';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { CreateArticleSchema, UpdateArticleSchema } from '../../application/validators/ArticleValidators';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/public';
import { authRateLimiter } from '@shared/interfaces/http/middleware/RateLimitMiddleware';
import { IdParamSchema, BookmarkSchema, ReadingHistorySchema, UpdateReadingProgressSchema } from '../../interfaces/validation/ArticleValidation';

export function createArticleRoutes(controller: ArticleController, authMiddleware: AuthenticationMiddleware): Router {
  const router = Router();
  const authenticate = authMiddleware.authenticate;

  router.post('/', authenticate, authRateLimiter, authorize(Permission.ARTICLE_CREATE), validate(CreateArticleSchema), (req, res) => controller.create(req, res));
  router.put('/:id', authenticate, authRateLimiter, authorize(Permission.ARTICLE_UPDATE), validate(UpdateArticleSchema), (req, res) => controller.update(req, res));
  router.delete('/:id', authenticate, authorize(Permission.ARTICLE_DELETE), validate(IdParamSchema), (req, res) => controller.delete(req, res));
  router.post('/:id/publish', authenticate, authorize(Permission.ARTICLE_PUBLISH), validate(IdParamSchema), (req, res) => controller.publish(req, res));
  router.post('/:id/archive', authenticate, authorize(Permission.ARTICLE_UPDATE), validate(IdParamSchema), (req, res) => controller.archive(req, res));
  router.post('/:id/submit', authenticate, authorize(Permission.ARTICLE_UPDATE), validate(IdParamSchema), (req, res) => controller.submitForReview(req, res));
  router.post('/:id/approve', authenticate, authorize(Permission.ARTICLE_APPROVE), validate(IdParamSchema), (req, res) => controller.approve(req, res));
  router.post('/bookmark', authenticate, authorize(Permission.ARTICLE_UPDATE), validate(BookmarkSchema), (req, res) => controller.addBookmark(req, res));
  router.post('/history', authenticate, authorize(Permission.ARTICLE_UPDATE), validate(ReadingHistorySchema), (req, res) => controller.addToReadingHistory(req, res));
  router.post('/progress', authenticate, authorize(Permission.ARTICLE_UPDATE), validate(UpdateReadingProgressSchema), (req, res) => controller.updateReadingProgress(req, res));
  router.get('/bookmarks', authenticate, authorize(Permission.ARTICLE_CREATE), (req, res) => controller.getBookmarks(req, res));
  router.get('/history', authenticate, authorize(Permission.ARTICLE_CREATE), (req, res) => controller.getReadingHistory(req, res));

  return router;
}
