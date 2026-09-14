import {
  NotificationId,
  RecipientId,
  TemplateId,
  NotificationType,
  DeliveryStatus,
  ChannelType,
} from '../value-objects/NotificationValueObjects';

export class Notification {
  constructor(
    public readonly id: NotificationId,
    public readonly recipientId: RecipientId,
    public readonly type: NotificationType,
    public readonly title: string,
    public readonly content: string,
    public readonly targetUrl: string | null,
    public readonly channel: ChannelType,
    public status: DeliveryStatus,
    public readonly createdAt: Date,
    public isRead: boolean = false,
    public readonly templateId: TemplateId | null = null,
  ) {}

  markAsRead(): void {
    this.isRead = true;
  }
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
