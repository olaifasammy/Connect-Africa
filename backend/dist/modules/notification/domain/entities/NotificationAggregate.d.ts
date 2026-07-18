import { Notification, NotificationDelivery } from '../entities/NotificationEntities';
export declare class NotificationAggregate {
    readonly notification: Notification;
    readonly deliveries: NotificationDelivery[];
    constructor(notification: Notification, deliveries: NotificationDelivery[]);
}
