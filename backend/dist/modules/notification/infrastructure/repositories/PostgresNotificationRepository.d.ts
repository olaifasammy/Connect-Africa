import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { PostgresProvider } from '../../../../shared/infrastructure/database/PostgresProvider';
import { Notification } from '../../domain/entities/NotificationEntities';
export declare class PostgresNotificationRepository implements INotificationRepository {
    private readonly db;
    constructor(db: PostgresProvider);
    save(notification: Notification): Promise<void>;
    findById(id: string): Promise<any>;
}
