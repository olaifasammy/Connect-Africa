import { Locale } from '../value-objects/SettingsValueObjects';

export class LocaleValidator {
  static validate(locale: string): void {
    new Locale(locale);
  }
}
