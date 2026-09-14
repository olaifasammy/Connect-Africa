import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';

@provide(DeleteNotificationCommandHandler, true)
@injectable()
export class DeleteNotificationCommandHandler {
  constructor(
    @inject('INotificationRepository')
    private readonly repository: INotificationRepository
  ) {}

  async handle(
    notificationId: string,
    recipientId: string
  ): Promise<void> {
    const deleted = await this.repository.deleteForRecipient(
      notificationId,
      recipientId
    );

    if (!deleted) {
      throw new Error('Notification not found');
    }
  }
}
