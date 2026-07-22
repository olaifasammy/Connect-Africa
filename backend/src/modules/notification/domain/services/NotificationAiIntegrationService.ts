import { injectable, inject } from 'inversify';
import { Notification } from '../entities/NotificationEntities';
import { INotificationRepository } from '../repositories/INotificationRepository';
import { PreferenceService } from './PreferenceService';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { NotificationSentEvent } from '../events/NotificationEvents';
import { AIGatewayService } from '@modules/ai/public';
import { UserId } from '@modules/auth/domain/value-objects/UserId';
import { NotificationId, RecipientId, TemplateId, DeliveryStatus, ChannelType } from '../value-objects/NotificationValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

@injectable()
export class NotificationAiIntegrationService {
  constructor(
    @inject('INotificationRepository') private readonly repository: INotificationRepository,
    @inject(PreferenceService) private readonly preferenceService: PreferenceService,
    @inject('EventBus') private readonly eventBus: EventBus,
    @inject(AIGatewayService) private readonly aiGateway: AIGatewayService
  ) {}

  async sendAiNotification(recipientId: string, message: string): Promise<void> {
    // 1. Log or preprocess via AI Gateway if needed (e.g., sanitization)
    const aiResponse = await this.aiGateway.processRequest({ 
      prompt: message,
      templateName: 'sanitize_message' 
    });
    const sanitizedMessage = aiResponse.content;

    // 2. Create notification entity
    const notification = new Notification(
      new NotificationId(new UniqueEntityId().toString()),
      new RecipientId(recipientId),
      new TemplateId("AI_ALERT"),
      ChannelType.IN_APP,
      DeliveryStatus.PENDING,
      new Date()
    );

    // 3. Persist and send
    await this.repository.save(notification);
    await this.eventBus.publish(new NotificationSentEvent(notification.id));
    
    console.log(`[NOTIFICATION_AI] Sent AI alert to ${recipientId}`);
  }
}
