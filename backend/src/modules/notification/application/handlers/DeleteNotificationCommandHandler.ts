import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';

@provide(DeleteNotificationCommandHandler, true)
@injectable()
export class DeleteNotificationCommandHandler {
  constructor(
    @inject('INotificationRepository') private readonly repository: INotificationRepository
  ) {}

  async handle(notificationId: string): Promise<void> {
    await this.repository.delete(notificationId);
  }
}
