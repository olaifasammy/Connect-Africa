import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import * as Domain from '../../domain/entities/NotificationEntities';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';

@provide(GetInboxQueryHandler, true)
@injectable()
export class GetInboxQueryHandler {
  constructor(
    @inject('INotificationRepository') private readonly repository: INotificationRepository
  ) {}

  async handle(recipientId: string): Promise<Domain.Notification[]> {
    return await this.repository.findManyByRecipient(recipientId);
  }
}
