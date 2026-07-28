import { injectable, inject } from 'inversify';
import { RecipientId } from '../value-objects/NotificationValueObjects';
import { NotificationPreference } from '../entities/NotificationEntities';
import { INotificationRepository } from '../repositories/INotificationRepository';

@injectable()
export class PreferenceService {
  constructor(
    @inject('INotificationRepository') private readonly repository: INotificationRepository
  ) {}
  
  async getPreference(recipientId: RecipientId): Promise<NotificationPreference | null> {
    // Should be a different repository or a method in this repository
    return null;
  }
}
