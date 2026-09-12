export class MarkAsReadCommand {
  constructor(public readonly notificationId: string) {}
}

export class DeleteNotificationCommand {
  constructor(public readonly notificationId: string) {}
}

export class UpdateNotificationPreferenceCommand {
  constructor(
    public readonly recipientId: string,
    public readonly channel: string,
    public readonly enabled: boolean,
  ) {}
}
