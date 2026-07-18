import { NotificationId } from '../value-objects/NotificationValueObjects';
export declare class NotificationSentEvent {
    readonly notificationId: NotificationId;
    constructor(notificationId: NotificationId);
}
export declare class NotificationDeliveredEvent {
    readonly notificationId: NotificationId;
    constructor(notificationId: NotificationId);
}
export declare class NotificationReadEvent {
    readonly notificationId: NotificationId;
    constructor(notificationId: NotificationId);
}
export declare class NotificationFailedEvent {
    readonly notificationId: NotificationId;
    readonly reason: string;
    constructor(notificationId: NotificationId, reason: string);
}
