import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { INotificationRepository } from '../../domain/repositories/INotificationRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import * as Domain from '../../domain/entities/NotificationEntities';
import { NotificationId, RecipientId, TemplateId, DeliveryStatus, ChannelType } from '../../domain/value-objects/NotificationValueObjects';

@provide('INotificationRepository', true)
@injectable()
export class PostgresNotificationRepository implements INotificationRepository {
  constructor(
    @inject(PostgresProvider) private readonly db: PostgresProvider
  ) {}

  async save(notification: Domain.Notification): Promise<void> {
    const client = await this.db.pool.connect();
    try {
      await client.query(
        'INSERT INTO notifications (id, recipient_id, template_id, channel, status, is_read) VALUES ($1, $2, $3, $4, $5, $6)',
        [notification.id.value, notification.recipientId.value, notification.templateId.value, notification.channel, notification.status, notification.isRead]
      );
    } finally {
      client.release();
    }
  }

  async findById(id: string): Promise<Domain.Notification | null> {
    const client = await this.db.pool.connect();
    try {
      const result = await client.query('SELECT * FROM notifications WHERE id = $1', [id]);
      if (result.rows.length === 0) return null;
      const row = result.rows[0];
      return new Domain.Notification(
          new NotificationId(row.id),
          new RecipientId(row.recipient_id),
          new TemplateId(row.template_id),
          row.channel as ChannelType,
          row.status as DeliveryStatus,
          new Date(row.created_at),
          row.is_read
      );
    } finally {
      client.release();
    }
  }

  async findManyByRecipient(recipientId: string): Promise<Domain.Notification[]> {
    const client = await this.db.pool.connect();
    try {
      const result = await client.query('SELECT * FROM notifications WHERE recipient_id = $1 ORDER BY created_at DESC', [recipientId]);
      return result.rows.map(row => new Domain.Notification(
          new NotificationId(row.id),
          new RecipientId(row.recipient_id),
          new TemplateId(row.template_id),
          row.channel as ChannelType,
          row.status as DeliveryStatus,
          new Date(row.created_at),
          row.is_read
      ));
    } finally {
      client.release();
    }
  }

  async update(notification: Domain.Notification): Promise<void> {
    const client = await this.db.pool.connect();
    try {
      await client.query(
        'UPDATE notifications SET status = $1, is_read = $2 WHERE id = $3',
        [notification.status, notification.isRead, notification.id.value]
      );
    } finally {
      client.release();
    }
  }

  async delete(id: string): Promise<void> {
    const client = await this.db.pool.connect();
    try {
      await client.query('DELETE FROM notifications WHERE id = $1', [id]);
    } finally {
      client.release();
    }
  }
}
