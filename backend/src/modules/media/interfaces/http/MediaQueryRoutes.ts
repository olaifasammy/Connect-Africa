import { Router } from 'express';
import { MediaController } from './MediaController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { GetMediaSchema, SearchMediaSchema, GetMediaByArticleSchema, GetMediaByEntitySchema, GetMediaUsageSchema } from './MediaValidation';
import { Permission } from '@modules/auth/public';

export function createMediaQueryRoutes(
  controller: MediaController,
  authMiddleware: AuthenticationMiddleware
): Router {
  const router = Router();

  router.get(
    '/:id',
    authMiddleware.authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    validate(GetMediaSchema),
    controller.getMedia.bind(controller)
  );

  router.get(
    '/search',
    authMiddleware.authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    validate(SearchMediaSchema),
    controller.searchMedia.bind(controller)
  );

  router.get(
    '/article/:articleId',
    authMiddleware.authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    validate(GetMediaByArticleSchema),
    controller.getMediaByArticle.bind(controller)
  );

  router.get(
    '/entity/:entityId',
    authMiddleware.authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    validate(GetMediaByEntitySchema),
    controller.getMediaByEntity.bind(controller)
  );

  router.get(
    '/usage/:mediaId',
    authMiddleware.authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    validate(GetMediaUsageSchema),
    controller.getMediaUsage.bind(controller)
  );

  return router;
}