export class LocaleValidator {
  static validate(locale: string): boolean {
    return locale.length > 0;
  }
}
