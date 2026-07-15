import { Settings } from '../entities/Settings';

export class SettingsOwnershipPolicy {
  static isOwner(settings: Settings, userId: string): boolean {
    return settings.userId === userId;
  }
}
