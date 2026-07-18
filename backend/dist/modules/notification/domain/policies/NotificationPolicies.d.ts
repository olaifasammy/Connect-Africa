import { Notification } from '../entities/NotificationEntities';
export interface IDeliveryPolicy {
    isEligible(notification: Notification): boolean;
}
export declare class DeliveryPolicy implements IDeliveryPolicy {
    isEligible(notification: Notification): boolean;
}
export declare class RetryPolicy {
    shouldRetry(attempts: number): boolean;
}
export declare class UserPreferencePolicy {
    isChannelEnabled(preference: any): boolean;
}
export declare class NotificationPolicy {
    canSend(notification: Notification): boolean;
}
export declare class RateLimitPolicy {
    isRateLimited(recipientId: string): boolean;
}
