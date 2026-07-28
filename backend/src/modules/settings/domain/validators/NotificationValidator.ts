import { NotificationPreference } from '../value-objects/SettingsValueObjects';

export class NotificationValidator {
  static validate(preference: string): void {
    new NotificationPreference(preference);
  }
}
