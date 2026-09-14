import { Router } from 'express';
import { NotificationController } from './NotificationController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';

import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';

export const createNotificationRoutes = (
  controller: NotificationController,
  authMiddleware: AuthenticationMiddleware,
): Router => {
  const router = Router();

  router.use(authMiddleware.authenticate);

  /*
   * Administrative/system notification creation.
   *
   * The recipient may be selected here because this endpoint is protected
   * by NOTIFICATION_MANAGE. User inbox operations never accept recipientId.
   */
  router.post(
    '/',
    authorize(Permission.NOTIFICATION_MANAGE),
    controller.send.bind(controller),
  );

  /*
   * Authenticated user's own notification inbox.
   */
  router.get(
    '/inbox',
    authorize(Permission.NOTIFICATION_READ),
    controller.getInbox.bind(controller),
  );

  router.get(
    '/unread-count',
    authorize(Permission.NOTIFICATION_READ),
    controller.getUnreadCount.bind(controller),
  );

  router.post(
    '/read-all',
    authorize(Permission.NOTIFICATION_READ),
    controller.markAllAsRead.bind(controller),
  );

  router.post(
    '/:id/read',
    authorize(Permission.NOTIFICATION_READ),
    controller.markAsRead.bind(controller),
  );

  router.delete(
    '/:id',
    authorize(Permission.NOTIFICATION_READ),
    controller.delete.bind(controller),
  );

  return router;
};
