import { PrivacyLevel } from '../value-objects/SettingsValueObjects';

export class PrivacyValidator {
  static validate(level: string): void {
    new PrivacyLevel(level);
  }
}
