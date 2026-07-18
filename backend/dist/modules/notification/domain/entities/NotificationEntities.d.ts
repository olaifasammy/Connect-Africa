import { NotificationId, RecipientId, TemplateId, DeliveryStatus, ChannelType } from '../value-objects/NotificationValueObjects';
export declare class Notification {
    readonly id: NotificationId;
    readonly recipientId: RecipientId;
    readonly templateId: TemplateId;
    readonly channel: ChannelType;
    status: DeliveryStatus;
    readonly createdAt: Date;
    constructor(id: NotificationId, recipientId: RecipientId, templateId: TemplateId, channel: ChannelType, status: DeliveryStatus, createdAt: Date);
}
export declare class NotificationTemplate {
    readonly id: TemplateId;
    readonly name: string;
    readonly content: string;
    constructor(id: TemplateId, name: string, content: string);
}
export declare class NotificationDelivery {
    readonly id: NotificationId;
    readonly notificationId: NotificationId;
    readonly channel: ChannelType;
    status: DeliveryStatus;
    readonly deliveredAt?: Date | undefined;
    constructor(id: NotificationId, notificationId: NotificationId, channel: ChannelType, status: DeliveryStatus, deliveredAt?: Date | undefined);
}
export declare class NotificationPreference {
    readonly recipientId: RecipientId;
    readonly channel: ChannelType;
    readonly enabled: boolean;
    constructor(recipientId: RecipientId, channel: ChannelType, enabled: boolean);
}
