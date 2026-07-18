import { INotificationRepository } from '../repositories/INotificationRepository';
import { PreferenceService } from './PreferenceService';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class NotificationAiIntegrationService {
    private readonly repository;
    private readonly preferenceService;
    private readonly eventBus;
    constructor(repository: INotificationRepository, preferenceService: PreferenceService, eventBus: EventBus);
    sendAiNotification(recipientId: string, message: string): Promise<void>;
}
