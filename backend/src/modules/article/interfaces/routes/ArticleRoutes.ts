import { Router } from 'express';
import { ArticleController } from '../controllers/ArticleController';
import {
  CreateArticleSchema,
  UpdateArticleSchema,
} from '../../application/validators/ArticleValidators';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/public';
import { authRateLimiter } from '@shared/interfaces/http/middleware/RateLimitMiddleware';
import {
  IdParamSchema,
  BookmarkSchema,
  ReadingHistorySchema,
  UpdateReadingProgressSchema,
} from '../../interfaces/validation/ArticleValidation';

export function createArticleRoutes(
  controller: ArticleController,
  authMiddleware: AuthenticationMiddleware,
): Router {
  const router = Router();
  const authenticate = authMiddleware.authenticate;

  // -------------------------------------------------------
  // Public read routes
  // -------------------------------------------------------
  router.get('/latest', (req, res) => controller.getLatest(req, res));
  router.get('/slug/:slug', (req, res) => controller.getBySlug(req, res));
  router.get('/entity/:entityId', (req, res) => controller.getByEntity(req, res));
  router.get('/category/:category', (req, res) => controller.getByCategory(req, res));
  router.get('/search', (req, res) => controller.search(req, res));

  // -------------------------------------------------------
  // Personal knowledge/activity routes
  //
  // These MUST precede /:id so "bookmarks" and "history"
  // cannot be interpreted as article IDs.
  // -------------------------------------------------------
  router.get(
    '/bookmarks',
    authenticate,
    authorize(Permission.USER_DATA_READ),
    (req, res) => controller.getBookmarks(req, res),
  );

  router.get(
    '/history',
    authenticate,
    authorize(Permission.USER_DATA_READ),
    (req, res) => controller.getReadingHistory(req, res),
  );

  router.post(
    '/bookmark',
    authenticate,
    authorize(Permission.USER_DATA_WRITE),
    authRateLimiter,
    validate(BookmarkSchema),
    (req, res) => controller.addBookmark(req, res),
  );

  router.delete(
    '/bookmark/:articleId',
    authenticate,
    authorize(Permission.USER_DATA_WRITE),
    authRateLimiter,
    validate(IdParamSchema),
    (req, res) => controller.removeBookmark(req, res),
  );

  router.post(
    '/history',
    authenticate,
    authorize(Permission.USER_DATA_WRITE),
    authRateLimiter,
    validate(ReadingHistorySchema),
    (req, res) => controller.addToReadingHistory(req, res),
  );

  router.post(
    '/progress',
    authenticate,
    authorize(Permission.USER_DATA_WRITE),
    authRateLimiter,
    validate(UpdateReadingProgressSchema),
    (req, res) => controller.updateReadingProgress(req, res),
  );

  // -------------------------------------------------------
  // Public article lookup
  // -------------------------------------------------------
  router.get('/:id', (req, res) => controller.getById(req, res));

  // -------------------------------------------------------
  // Article lifecycle / mutation routes
  // -------------------------------------------------------
  router.post(
    '/',
    authenticate,
    authRateLimiter,
    authorize(Permission.ARTICLE_CREATE),
    validate(CreateArticleSchema),
    (req, res) => controller.create(req, res),
  );

  router.put(
    '/:id',
    authenticate,
    authRateLimiter,
    authorize(Permission.ARTICLE_UPDATE),
    validate(UpdateArticleSchema),
    (req, res) => controller.update(req, res),
  );

  router.delete(
    '/:id',
    authenticate,
    authorize(Permission.ARTICLE_DELETE),
    validate(IdParamSchema),
    (req, res) => controller.delete(req, res),
  );

  router.post(
    '/:id/publish',
    authenticate,
    authorize(Permission.ARTICLE_PUBLISH),
    validate(IdParamSchema),
    (req, res) => controller.publish(req, res),
  );

  router.post(
    '/:id/unpublish',
    authenticate,
    authorize(Permission.ARTICLE_PUBLISH),
    validate(IdParamSchema),
    (req, res) => controller.unpublish(req, res),
  );

  router.post(
    '/:id/archive',
    authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    validate(IdParamSchema),
    (req, res) => controller.archive(req, res),
  );

  router.post(
    '/:id/submit',
    authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    validate(IdParamSchema),
    (req, res) => controller.submitForReview(req, res),
  );

  router.post(
    '/:id/approve',
    authenticate,
    authorize(Permission.ARTICLE_APPROVE),
    validate(IdParamSchema),
    (req, res) => controller.approve(req, res),
  );

  router.post(
    '/:id/reject',
    authenticate,
    authorize(Permission.ARTICLE_APPROVE),
    validate(IdParamSchema),
    (req, res) => controller.reject(req, res),
  );

  router.post(
    '/:id/restore',
    authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    validate(IdParamSchema),
    (req, res) => controller.restore(req, res),
  );

  // -------------------------------------------------------
  // Knowledge relationships
  // -------------------------------------------------------
  router.post(
    '/:id/entities',
    authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    (req, res) => controller.linkEntity(req, res),
  );

  router.delete(
    '/:id/entities/:entityId',
    authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    (req, res) => controller.unlinkEntity(req, res),
  );

  return router;
}
