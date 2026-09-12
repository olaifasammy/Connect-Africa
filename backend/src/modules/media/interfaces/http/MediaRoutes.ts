import { Router } from 'express';
import { MediaController } from './MediaController';
import multer from 'multer';
import { uploadRateLimiter, validateFile, virusScanHook } from './middleware/MediaMiddleware';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { validate } from '@shared/interfaces/http/middleware/ZodValidationMiddleware';
import { UploadMediaSchema, AttachMediaSchema, UpdateMediaSchema, ArchiveMediaSchema, DeleteMediaSchema, GenerateThumbnailSchema, MoveMediaSchema, PublishMediaSchema, RenameMediaSchema, RestoreMediaSchema, CopyMediaSchema } from './MediaValidation';
import { Permission } from '@modules/auth/public';

const upload = multer({ storage: multer.memoryStorage() });

export function createMediaRoutes(
  controller: MediaController,
  authMiddleware: AuthenticationMiddleware
): Router {
  const router = Router();
  router.post(
    '/',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    uploadRateLimiter,
    upload.single('file'),
    validateFile,
    virusScanHook,
    validate(UploadMediaSchema),
    controller.upload.bind(controller)
  );
  router.post(
    '/:mediaId/attach',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    validate(AttachMediaSchema),
    controller.attach.bind(controller)
  );
  router.put(
    '/:id',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    validate(UpdateMediaSchema),
    controller.update.bind(controller)
  );
  router.post(
    '/:id/archive',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    validate(ArchiveMediaSchema),
    controller.archive.bind(controller)
  );
  router.delete(
    '/:id',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    validate(DeleteMediaSchema),
    controller.delete.bind(controller)
  );
  router.post(
    '/:id/thumbnail',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    validate(GenerateThumbnailSchema),
    controller.generateThumbnail.bind(controller)
  );
  router.post(
    '/:id/move',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    validate(MoveMediaSchema),
    controller.move.bind(controller)
  );
  router.post(
    '/:id/publish',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    validate(PublishMediaSchema),
    controller.publish.bind(controller)
  );
  router.post(
    '/:id/rename',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    validate(RenameMediaSchema),
    controller.rename.bind(controller)
  );
  router.post(
    '/:id/restore',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    validate(RestoreMediaSchema),
    controller.restore.bind(controller)
  );
  router.post(
    '/:id/copy',
    authMiddleware.authenticate,
    authorize(Permission.MEDIA_WRITE),
    validate(CopyMediaSchema),
    controller.copy.bind(controller)
  );
  return router;
}
