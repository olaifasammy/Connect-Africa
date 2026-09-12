import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Notification } from '../entities/NotificationEntities';
import { DeliveryStatus, ChannelType } from '../value-objects/NotificationValueObjects';
import { EmailProvider } from '@shared/infrastructure/email/EmailProvider';
import { logger } from '@shared/logger/Logger';

@provide(DeliveryService, true)
@injectable()
export class DeliveryService {
  constructor(@inject(EmailProvider) private readonly emailProvider: EmailProvider) {}

  async deliver(notification: Notification, recipientEmail?: string, subject?: string, message?: string): Promise<void> {
    try {
      switch (notification.channel) {
        case ChannelType.EMAIL:
          if (recipientEmail && subject && message) {
            await this.emailProvider.send({
              to: recipientEmail,
              subject,
              body: message,
            });
          }
          break;
        case ChannelType.IN_APP:
        case ChannelType.PUSH:
          logger.info(`Notification delivered via channel ${notification.channel} to recipient ${notification.recipientId.value}`);
          break;
        default:
          logger.warn(`Unknown notification channel: ${notification.channel}`);
      }
      notification.status = DeliveryStatus.DELIVERED;
    } catch (error) {
      logger.error('Failed to deliver notification', error);
      notification.status = DeliveryStatus.FAILED;
      throw error;
    }
  }
}
