import { Notification } from '../entities/NotificationEntities';
import { INotificationRepository } from '../repositories/INotificationRepository';
import { PreferenceService } from '../services/PreferenceService';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class NotificationService {
    private readonly repository;
    private readonly preferenceService;
    private readonly eventBus;
    constructor(repository: INotificationRepository, preferenceService: PreferenceService, eventBus: EventBus);
    send(notification: Notification): Promise<void>;
}
