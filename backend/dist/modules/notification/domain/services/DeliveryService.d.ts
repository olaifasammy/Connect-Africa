import { Notification } from '../entities/NotificationEntities';
export declare class DeliveryService {
    deliver(notification: Notification): Promise<void>;
}
