import {
  ChannelType,
  NotificationType,
} from '../../domain/value-objects/NotificationValueObjects';

export class SendNotificationCommand {
  constructor(
    public readonly recipientId: string,
    public readonly type: NotificationType,
    public readonly title: string,
    public readonly content: string,
    public readonly channel: ChannelType,
    public readonly targetUrl: string | null = null,
    public readonly templateId: string | null = null,
  ) {}
}
