import { injectable, inject } from 'inversify';
import { Notification } from '../entities/NotificationEntities';
import { INotificationRepository } from '../repositories/INotificationRepository';
import { DeliveryPolicy, UserPreferencePolicy } from '../policies/NotificationPolicies';
import { PreferenceService } from '../services/PreferenceService';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { NotificationSentEvent } from '../events/NotificationEvents';
import { IAuditLogger } from '@modules/auth/public'; // Assuming this interface

@injectable()
export class NotificationService {
  constructor(
    @inject('INotificationRepository') private readonly repository: INotificationRepository,
    @inject(PreferenceService) private readonly preferenceService: PreferenceService,
    @inject('EventBus') private readonly eventBus: EventBus,
    @inject('IAuditLogger') private readonly auditLogger: IAuditLogger
  ) {}

  async send(notification: Notification): Promise<void> {
    const preference = await this.preferenceService.getPreference(notification.recipientId);
    
    if (preference && !new UserPreferencePolicy().isChannelEnabled(preference)) {
      return; 
    }

    if (!new DeliveryPolicy().isEligible(notification)) {
      throw new Error('Notification not eligible for delivery');
    }

    await this.repository.save(notification);
    await this.eventBus.publish(new NotificationSentEvent(notification.id));
    await this.auditLogger.log({ status: "SUCCESS", action: "NotificationSent", resource: notification.id.value, user: notification.recipientId.value });
  }
}
