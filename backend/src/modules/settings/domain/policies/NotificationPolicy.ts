export class NotificationPolicy {
  static canSetNotification(enabled: boolean): boolean {
    return typeof enabled === 'boolean';
  }
}
