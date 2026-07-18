import { RecipientId } from '../value-objects/NotificationValueObjects';
import { NotificationPreference } from '../entities/NotificationEntities';
import { INotificationRepository } from '../repositories/INotificationRepository';
export declare class PreferenceService {
    private readonly repository;
    constructor(repository: INotificationRepository);
    getPreference(recipientId: RecipientId): Promise<NotificationPreference | null>;
}
