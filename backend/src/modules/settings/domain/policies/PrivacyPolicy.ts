export class PrivacyPolicy {
  static canSetPrivacy(level: string): boolean {
    return ['public', 'private'].includes(level);
  }
}
