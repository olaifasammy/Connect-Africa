import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import * as Domain from '../../domain/entities/NotificationEntities';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';

@provide(MarkAsReadCommandHandler, true)
@injectable()
export class MarkAsReadCommandHandler {
  constructor(
    @inject('INotificationRepository') private readonly repository: INotificationRepository
  ) {}

  async handle(notificationId: string): Promise<void> {
    const notification = await this.repository.findById(notificationId);
    if (!notification) {
      throw new Error('Notification not found');
    }
    notification.isRead = true;
    await this.repository.update(notification);
  }
}
