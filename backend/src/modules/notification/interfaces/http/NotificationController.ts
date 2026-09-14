import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { SendNotificationHandler } from '../../application/handlers/SendNotificationHandler';
import { MarkAsReadCommandHandler } from '../../application/handlers/MarkAsReadCommandHandler';
import { MarkAllAsReadCommandHandler } from '../../application/handlers/MarkAllAsReadCommandHandler';
import { DeleteNotificationCommandHandler } from '../../application/handlers/DeleteNotificationCommandHandler';
import { GetInboxQueryHandler } from '../../application/handlers/GetInboxQueryHandler';
import { GetUnreadNotificationCountQueryHandler } from '../../application/handlers/GetUnreadNotificationCountQueryHandler';

import {
  NotificationResponseDto,
  NotificationInboxResponseDto,
  NotificationUnreadCountResponseDto,
  MarkAllAsReadResponseDto,
} from '../../application/dtos/NotificationDtos';

import {
  ChannelType,
  NotificationType,
} from '../../domain/value-objects/NotificationValueObjects';

@provide(NotificationController, true)
@injectable()
export class NotificationController {
  constructor(
    @inject(SendNotificationHandler)
    private readonly sendNotificationHandler: SendNotificationHandler,

    @inject(MarkAsReadCommandHandler)
    private readonly markAsReadCommandHandler: MarkAsReadCommandHandler,

    @inject(MarkAllAsReadCommandHandler)
    private readonly markAllAsReadCommandHandler: MarkAllAsReadCommandHandler,

    @inject(DeleteNotificationCommandHandler)
    private readonly deleteNotificationCommandHandler: DeleteNotificationCommandHandler,

    @inject(GetInboxQueryHandler)
    private readonly getInboxQueryHandler: GetInboxQueryHandler,

    @inject(GetUnreadNotificationCountQueryHandler)
    private readonly getUnreadNotificationCountQueryHandler: GetUnreadNotificationCountQueryHandler,
  ) {}

  async send(req: Request, res: Response): Promise<void> {
    const {
      recipientId,
      type,
      title,
      content,
      channel,
      targetUrl,
      templateId,
    } = req.body;

    if (!Object.values(NotificationType).includes(type)) {
      res.status(400).json({
        success: false,
        message: 'Invalid notification type',
      });
      return;
    }

    if (!Object.values(ChannelType).includes(channel)) {
      res.status(400).json({
        success: false,
        message: 'Invalid notification channel',
      });
      return;
    }

    if (
      typeof recipientId !== 'string' ||
      !recipientId.trim() ||
      typeof title !== 'string' ||
      !title.trim() ||
      typeof content !== 'string' ||
      !content.trim()
    ) {
      res.status(400).json({
        success: false,
        message: 'recipientId, title, and content are required',
      });
      return;
    }

    const notificationId = await this.sendNotificationHandler.handle({
      recipientId,
      type,
      title: title.trim(),
      content: content.trim(),
      channel,
      targetUrl: targetUrl ?? null,
      templateId: templateId ?? null,
    });

    res.status(201).json({
      success: true,
      data: {
        id: notificationId,
        status: 'PENDING',
      },
    });
  }

  async getInbox(req: Request, res: Response): Promise<void> {
    const recipientId = this.getAuthenticatedUserId(req);

    const [notifications, unreadCount] = await Promise.all([
      this.getInboxQueryHandler.handle(recipientId),
      this.getUnreadNotificationCountQueryHandler.handle(recipientId),
    ]);

    const data: NotificationInboxResponseDto = {
      notifications: notifications.map((notification) =>
        this.toResponseDto(notification)
      ),
      unreadCount,
    };

    res.status(200).json({
      success: true,
      data,
    });
  }

  async getUnreadCount(req: Request, res: Response): Promise<void> {
    const recipientId = this.getAuthenticatedUserId(req);

    const unreadCount =
      await this.getUnreadNotificationCountQueryHandler.handle(recipientId);

    const data: NotificationUnreadCountResponseDto = {
      unreadCount,
    };

    res.status(200).json({
      success: true,
      data,
    });
  }

  async markAsRead(req: Request, res: Response): Promise<void> {
    const recipientId = this.getAuthenticatedUserId(req);
    const notificationId = String(req.params.id);

    await this.markAsReadCommandHandler.handle(
      notificationId,
      recipientId
    );

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
    });
  }

  async markAllAsRead(req: Request, res: Response): Promise<void> {
    const recipientId = this.getAuthenticatedUserId(req);

    const updatedCount =
      await this.markAllAsReadCommandHandler.handle(recipientId);

    const data: MarkAllAsReadResponseDto = {
      updatedCount,
    };

    res.status(200).json({
      success: true,
      data,
    });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const recipientId = this.getAuthenticatedUserId(req);
    const notificationId = String(req.params.id);

    await this.deleteNotificationCommandHandler.handle(
      notificationId,
      recipientId
    );

    res.status(204).send();
  }

  private getAuthenticatedUserId(req: Request): string {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error('Authenticated user ID is unavailable');
    }

    return String(userId);
  }

  private toResponseDto(notification: any): NotificationResponseDto {
    return {
      id: notification.id.value,
      recipientId: notification.recipientId.value,
      type: notification.type,
      title: notification.title,
      content: notification.content,
      targetUrl: notification.targetUrl,
      channel: notification.channel,
      status: notification.status,
      isRead: notification.isRead,
      createdAt: notification.createdAt.toISOString(),
      templateId: notification.templateId?.value ?? null,
    };
  }
}
