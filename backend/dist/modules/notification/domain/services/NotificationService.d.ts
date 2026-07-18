import { Notification } from '../entities/NotificationEntities';
import { INotificationRepository } from '../repositories/INotificationRepository';
import { PreferenceService } from '../services/PreferenceService';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
import { IAuditLogger } from '../../../auth/public';
export declare class NotificationService {
    private readonly repository;
    private readonly preferenceService;
    private readonly eventBus;
    private readonly auditLogger;
    constructor(repository: INotificationRepository, preferenceService: PreferenceService, eventBus: EventBus, auditLogger: IAuditLogger);
    send(notification: Notification): Promise<void>;
}
