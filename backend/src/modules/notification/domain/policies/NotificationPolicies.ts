import { Notification } from '../entities/NotificationEntities';
import {
  DeliveryStatus,
  ChannelType,
} from '../value-objects/NotificationValueObjects';

export interface IDeliveryPolicy {
  isEligible(notification: Notification): boolean;
}

export class DeliveryPolicy implements IDeliveryPolicy {
  isEligible(notification: Notification): boolean {
    return notification.status === DeliveryStatus.PENDING;
  }
}

export class RetryPolicy {
  shouldRetry(attempts: number): boolean {
    return attempts < 3;
  }
}

export class UserPreferencePolicy {
  isChannelEnabled(
    preference: {
      enabled: boolean;
      channel: ChannelType;
    },
    notificationChannel: ChannelType,
  ): boolean {
    return (
      preference.enabled &&
      preference.channel === notificationChannel
    );
  }
}

export class NotificationPolicy {
  canSend(notification: Notification): boolean {
    return true; // Simplified for skeleton
  }
}

export class RateLimitPolicy {
  isRateLimited(recipientId: string): boolean {
    return false; // Simplified for skeleton
  }
}
