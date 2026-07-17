import { Theme } from '../value-objects/SettingsValueObjects';

export class ThemeValidator {
  static validate(theme: string): void {
    new Theme(theme); // Will throw if invalid
  }
}
