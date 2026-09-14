import * as Domain from '../entities/NotificationEntities';

export interface INotificationRepository {
  save(notification: Domain.Notification): Promise<void>;

  findManyByRecipient(recipientId: string): Promise<Domain.Notification[]>;

  countUnreadByRecipient(recipientId: string): Promise<number>;

  markAsRead(notificationId: string, recipientId: string): Promise<boolean>;

  markAllAsRead(recipientId: string): Promise<number>;

  deleteForRecipient(notificationId: string, recipientId: string): Promise<boolean>;
}
