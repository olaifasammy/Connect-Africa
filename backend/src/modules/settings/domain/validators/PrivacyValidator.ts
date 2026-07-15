export class PrivacyValidator {
  static validate(level: string): boolean {
    return ['public', 'private'].includes(level);
  }
}
