export class NotificationValidator {
  static validate(enabled: boolean): boolean {
    return typeof enabled === 'boolean';
  }
}
