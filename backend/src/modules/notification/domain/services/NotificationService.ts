import { injectable, inject } from 'inversify';
import { Notification } from '../entities/NotificationEntities';
import { INotificationRepository } from '../repositories/INotificationRepository';
import { DeliveryPolicy, UserPreferencePolicy } from '../policies/NotificationPolicies';
import { PreferenceService } from '../services/PreferenceService';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { NotificationSentEvent } from '../events/NotificationEvents';
import { AuditLogRequestedEvent } from '@modules/audit/domain/events/AuditLogRequestedEvent';

@injectable()
export class NotificationService {
  constructor(
    @inject('INotificationRepository') private readonly repository: INotificationRepository,
    @inject(PreferenceService) private readonly preferenceService: PreferenceService,
    @inject('EventBus') private readonly eventBus: EventBus
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
    
    // Decoupled audit logging
    await this.eventBus.publish(new AuditLogRequestedEvent({
      action: "NotificationSent",
      actorId: "SYSTEM",
      actorType: "SYSTEM",
      ipAddress: "0.0.0.0",
      userAgent: "SYSTEM",
      resourceId: notification.id.value,
      resourceType: "Notification",
      metadata: [{ key: "recipientId", value: notification.recipientId.value }]
    }));
  }
}
