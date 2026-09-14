import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';

@provide(GetUnreadNotificationCountQueryHandler, true)
@injectable()
export class GetUnreadNotificationCountQueryHandler {
  constructor(
    @inject('INotificationRepository')
    private readonly repository: INotificationRepository
  ) {}

  async handle(recipientId: string): Promise<number> {
    return this.repository.countUnreadByRecipient(recipientId);
  }
}
