import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';

@provide(MarkAsReadCommandHandler, true)
@injectable()
export class MarkAsReadCommandHandler {
  constructor(
    @inject('INotificationRepository')
    private readonly repository: INotificationRepository
  ) {}

  async handle(
    notificationId: string,
    recipientId: string
  ): Promise<void> {
    const updated = await this.repository.markAsRead(
      notificationId,
      recipientId
    );

    if (!updated) {
      const notifications = await this.repository.findManyByRecipient(
        recipientId
      );

      const notificationExists = notifications.some(
        (notification) => notification.id.value === notificationId
      );

      if (!notificationExists) {
        throw new Error('Notification not found');
      }
    }
  }
}
