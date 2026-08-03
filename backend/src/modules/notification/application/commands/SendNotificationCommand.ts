export class SendNotificationCommand {
  constructor(
    public readonly recipientId: string,
    public readonly templateId: string,
    public readonly channel: string,
  ) {}
}
