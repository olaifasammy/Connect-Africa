import { ChannelType } from '../../domain/value-objects/NotificationValueObjects';

export class SendNotificationCommand {
  constructor(
    public readonly recipientId: string,
    public readonly templateId: string,
    public readonly channel: ChannelType,
  ) {}
}
