import { ISettingsRepository } from '../domain/repositories/ISettingsRepository';
import { UserSettings } from '../domain/entities/UserSettings';
import { UserId } from '@modules/auth/domain/value-objects/UserId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

export class PostgresUserSettingsRepository implements ISettingsRepository {
  constructor(private readonly provider: PostgresProvider) {}

  async findById(id: UniqueEntityId): Promise<UserSettings | null> {
    const query = 'SELECT * FROM user_settings WHERE id = $1';
    const result = await this.provider.query(query, [id.toString()]);
    if (result.rows.length === 0) return null;
    return this.mapToDomain(result.rows[0]);
  }

  async findByUserId(userId: UserId): Promise<UserSettings | null> {
    const query = 'SELECT * FROM user_settings WHERE user_id = $1';
    const result = await this.provider.query(query, [userId.value]);
    if (result.rows.length === 0) return null;
    return this.mapToDomain(result.rows[0]);
  }

  async save(entity: UserSettings): Promise<void> {
    const query = `
      INSERT INTO user_settings (id, user_id, theme, notifications_enabled, updated_at)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET
        theme = EXCLUDED.theme,
        notifications_enabled = EXCLUDED.notifications_enabled,
        updated_at = EXCLUDED.updated_at;
    `;
    await this.provider.query(query, [
      entity.id.toString(),
      entity.userId.value,
      entity.theme,
      entity.notificationsEnabled,
      entity.updatedAt
    ]);
  }

  async delete(id: UniqueEntityId): Promise<void> {
    const query = 'DELETE FROM user_settings WHERE id = $1';
    await this.provider.query(query, [id.toString()]);
  }

  private mapToDomain(row: any): UserSettings {
    return UserSettings.create({
      userId: UserId.create(row.user_id),
      theme: row.theme,
      notificationsEnabled: row.notifications_enabled,
      updatedAt: row.updated_at
    }, new UniqueEntityId(row.id));
  }
}
