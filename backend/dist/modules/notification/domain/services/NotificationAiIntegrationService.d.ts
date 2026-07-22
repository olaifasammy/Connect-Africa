import { INotificationRepository } from '../repositories/INotificationRepository';
import { PreferenceService } from './PreferenceService';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
import { AIGatewayService } from '../../../ai/public';
export declare class NotificationAiIntegrationService {
    private readonly repository;
    private readonly preferenceService;
    private readonly eventBus;
    private readonly aiGateway;
    constructor(repository: INotificationRepository, preferenceService: PreferenceService, eventBus: EventBus, aiGateway: AIGatewayService);
    sendAiNotification(recipientId: string, message: string): Promise<void>;
}
