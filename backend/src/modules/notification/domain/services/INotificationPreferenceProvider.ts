import { ChannelType } from '../value-objects/NotificationValueObjects';

export interface NotificationPreferenceState {
  enabled: boolean;
  channel: ChannelType;
}

export interface INotificationPreferenceProvider {
  getPreference(recipientId: string): Promise<NotificationPreferenceState | null>;
}
