import { NotificationId, RecipientId, TemplateId, DeliveryStatus, ChannelType } from '../value-objects/NotificationValueObjects';

export class Notification {
  constructor(
    public readonly id: NotificationId,
    public readonly recipientId: RecipientId,
    public readonly templateId: TemplateId,
    public readonly channel: ChannelType,
    public status: DeliveryStatus,
    public readonly createdAt: Date,
  ) {}
}

export class NotificationTemplate {
  constructor(
    public readonly id: TemplateId,
    public readonly name: string,
    public readonly content: string,
  ) {}
}

export class NotificationDelivery {
  constructor(
    public readonly id: NotificationId,
    public readonly notificationId: NotificationId,
    public readonly channel: ChannelType,
    public status: DeliveryStatus,
    public readonly deliveredAt?: Date,
  ) {}
}

export class NotificationPreference {
  constructor(
    public readonly recipientId: RecipientId,
    public readonly channel: ChannelType,
    public readonly enabled: boolean,
  ) {}
}
