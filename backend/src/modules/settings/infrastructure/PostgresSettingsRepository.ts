import { ISettingsRepository } from '../domain/repositories/ISettingsRepository';
import { Settings } from '../domain/entities/Settings';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { Theme, Timezone, Locale } from '../domain/value-objects/SettingsValueObjects';

export class PostgresSettingsRepository implements ISettingsRepository {
  constructor(private readonly provider: PostgresProvider) {}

  async findById(userId: string): Promise<Settings | null> {
    const query = 'SELECT * FROM settings WHERE user_id = $1';
    const result = await this.provider.query(query, [userId]);
    if (result.rows.length === 0) return null;
    return this.mapToDomain(result.rows[0]);
  }

  async save(settings: Settings): Promise<void> {
    const query = `
      INSERT INTO settings (user_id, theme, timezone, locale)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id) DO UPDATE SET
        theme = EXCLUDED.theme,
        timezone = EXCLUDED.timezone,
        locale = EXCLUDED.locale;
    `;
    await this.provider.query(query, [
      settings.userId,
      settings.theme.toString(),
      settings.timezone.toString(),
      settings.locale.toString()
    ]);
  }

  private mapToDomain(row: any): Settings {
    return new Settings({
      userId: row.user_id,
      theme: new Theme(row.theme),
      timezone: new Timezone(row.timezone),
      locale: new Locale(row.locale)
    }, new UniqueEntityId(row.user_id));
  }
}
