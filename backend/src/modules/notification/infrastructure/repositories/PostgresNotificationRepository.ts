import { injectable, inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import {
  INotificationRepository,
} from '../../domain/repositories/INotificationRepository';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import * as Domain from '../../domain/entities/NotificationEntities';
import {
  NotificationId,
  RecipientId,
  TemplateId,
  NotificationType,
  DeliveryStatus,
  ChannelType,
} from '../../domain/value-objects/NotificationValueObjects';

@provide('INotificationRepository', true)
@injectable()
export class PostgresNotificationRepository implements INotificationRepository {
  constructor(
    @inject('PostgresProvider') private readonly db: PostgresProvider
  ) {}

  async save(notification: Domain.Notification): Promise<void> {
    await this.db.query(
      `INSERT INTO notifications (
        id,
        recipient_id,
        template_id,
        notification_type,
        title,
        content,
        target_url,
        channel,
        status,
        created_at,
        is_read
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        notification.id.value,
        notification.recipientId.value,
        notification.templateId?.value ?? null,
        notification.type,
        notification.title,
        notification.content,
        notification.targetUrl,
        notification.channel,
        notification.status,
        notification.createdAt,
        notification.isRead,
      ]
    );
  }

  async findManyByRecipient(
    recipientId: string
  ): Promise<Domain.Notification[]> {
    const result = await this.db.query(
      `SELECT
        id,
        recipient_id,
        template_id,
        notification_type,
        title,
        content,
        target_url,
        channel,
        status,
        created_at,
        is_read
      FROM notifications
      WHERE recipient_id = $1
      ORDER BY created_at DESC`,
      [recipientId]
    );

    return result.rows.map((row) => this.toDomain(row));
  }

  async countUnreadByRecipient(recipientId: string): Promise<number> {
    const result = await this.db.query(
      `SELECT COUNT(*)::int AS count
       FROM notifications
       WHERE recipient_id = $1
         AND is_read = FALSE`,
      [recipientId]
    );

    return result.rows[0]?.count ?? 0;
  }

  async markAsRead(
    notificationId: string,
    recipientId: string
  ): Promise<boolean> {
    const result = await this.db.query(
      `UPDATE notifications
       SET is_read = TRUE
       WHERE id = $1
         AND recipient_id = $2
         AND is_read = FALSE`,
      [notificationId, recipientId]
    );

    return (result.rowCount ?? 0) > 0;
  }

  async markAllAsRead(recipientId: string): Promise<number> {
    const result = await this.db.query(
      `UPDATE notifications
       SET is_read = TRUE
       WHERE recipient_id = $1
         AND is_read = FALSE`,
      [recipientId]
    );

    return result.rowCount ?? 0;
  }

  async deleteForRecipient(
    notificationId: string,
    recipientId: string
  ): Promise<boolean> {
    const result = await this.db.query(
      `DELETE FROM notifications
       WHERE id = $1
         AND recipient_id = $2`,
      [notificationId, recipientId]
    );

    return (result.rowCount ?? 0) > 0;
  }

  private toDomain(row: any): Domain.Notification {
    return new Domain.Notification(
      new NotificationId(row.id),
      new RecipientId(row.recipient_id),
      row.notification_type as NotificationType,
      row.title,
      row.content,
      row.target_url ?? null,
      row.channel as ChannelType,
      row.status as DeliveryStatus,
      new Date(row.created_at),
      row.is_read,
      row.template_id ? new TemplateId(row.template_id) : null,
    );
  }
}
