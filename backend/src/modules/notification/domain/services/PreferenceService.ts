import { provide } from 'inversify-binding-decorators';
import { injectable, inject } from 'inversify';

import { RecipientId } from '../value-objects/NotificationValueObjects';
import {
  INotificationPreferenceProvider,
  NotificationPreferenceState,
} from './INotificationPreferenceProvider';

@provide(PreferenceService, true)
@injectable()
export class PreferenceService {
  constructor(
    @inject('INotificationPreferenceProvider')
    private readonly preferenceProvider: INotificationPreferenceProvider,
  ) {}

  async getPreference(
    recipientId: RecipientId,
  ): Promise<NotificationPreferenceState | null> {
    return this.preferenceProvider.getPreference(recipientId.value);
  }
}
