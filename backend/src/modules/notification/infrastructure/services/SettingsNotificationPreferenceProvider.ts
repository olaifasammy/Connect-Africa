import { inject, injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ISettingsRepository } from '@modules/settings/public';
import { ChannelType } from '../../domain/value-objects/NotificationValueObjects';
import {
  INotificationPreferenceProvider,
  NotificationPreferenceState,
} from '../../domain/services/INotificationPreferenceProvider';

@provide('INotificationPreferenceProvider', true)
@injectable()
export class SettingsNotificationPreferenceProvider
  implements INotificationPreferenceProvider
{
  constructor(
    @inject('ISettingsRepository')
    private readonly settingsRepository: ISettingsRepository,
  ) {}

  async getPreference(
    recipientId: string,
  ): Promise<NotificationPreferenceState | null> {
    const settings = await this.settingsRepository.findById(recipientId);

    if (!settings) {
      return null;
    }

    const preference =
      settings.notificationSettings.preference.toString().toLowerCase();

    const channelMap: Record<string, ChannelType> = {
      in_app: ChannelType.IN_APP,
      email: ChannelType.EMAIL,
      push: ChannelType.PUSH,
    };

    const channel = channelMap[preference];

    if (!channel) {
      return null;
    }

    return {
      enabled: settings.notificationSettings.enabled,
      channel,
    };
  }
}
