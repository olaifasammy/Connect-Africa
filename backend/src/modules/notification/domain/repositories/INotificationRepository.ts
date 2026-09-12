import * as Domain from '../entities/NotificationEntities';

export interface INotificationRepository {
  save(notification: Domain.Notification): Promise<void>;
  findById(id: string): Promise<Domain.Notification | null>;
  findManyByRecipient(recipientId: string): Promise<Domain.Notification[]>;
  update(notification: Domain.Notification): Promise<void>;
  delete(id: string): Promise<void>;
}
