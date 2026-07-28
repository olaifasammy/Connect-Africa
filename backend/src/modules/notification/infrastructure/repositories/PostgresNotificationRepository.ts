import { injectable, inject } from 'inversify';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { Notification } from '../../domain/entities/NotificationEntities';
import { NotificationId } from '../../domain/value-objects/NotificationValueObjects';

@injectable()
export class PostgresNotificationRepository implements INotificationRepository {
  constructor(
    @inject(PostgresProvider) private readonly db: PostgresProvider
  ) {}

  async save(notification: Notification): Promise<void> {
    const client = await this.db.pool.connect();
    try {
      await client.query(
        'INSERT INTO notifications (id, recipient_id, template_id, channel, status) VALUES ($1, $2, $3, $4, $5)',
        [notification.id.value, notification.recipientId.value, notification.templateId.value, notification.channel, notification.status]
      );
    } finally {
      client.release();
    }
  }

  async findById(id: string): Promise<any> {
    const client = await this.db.pool.connect();
    try {
      const result = await client.query('SELECT * FROM notifications WHERE id = $1', [id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  }
}
