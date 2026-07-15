import { Router } from 'express';
import { MediaController } from './MediaController';
import multer from 'multer';
import { uploadRateLimiter, validateFile, virusScanHook } from './middleware/MediaMiddleware';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';

const upload = multer({ storage: multer.memoryStorage() });

export function createMediaRoutes(
  controller: MediaController,
  authMiddleware: AuthenticationMiddleware
): Router {
  const router = Router();
  router.post(
    '/',
    authMiddleware.authenticate,
    authorize(Permission.ARTICLE_CREATE),
    uploadRateLimiter,
    upload.single('file'),
    validateFile,
    virusScanHook,
    controller.upload.bind(controller)
  );
  router.post(
    '/:mediaId/attach',
    authMiddleware.authenticate,
    authorize(Permission.ARTICLE_UPDATE),
    controller.attach.bind(controller)
  );
  return router;
}
