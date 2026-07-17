import { ISettingsRepository } from '../domain/repositories/ISettingsRepository';
import { Settings } from '../domain/entities/Settings';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { Theme, Timezone, Locale } from '../domain/value-objects/SettingsValueObjects';
import { ThemeSettings } from '../domain/entities/ThemeSettings';
import { NotificationSettings } from '../domain/entities/NotificationSettings';
import { PrivacySettings } from '../domain/entities/PrivacySettings';
import { LanguageSettings } from '../domain/entities/LanguageSettings';
import { SecuritySettings } from '../domain/entities/SecuritySettings';
import { PreferenceSettings } from '../domain/entities/PreferenceSettings';
import { PrivacyLevel, NotificationPreference } from '../domain/value-objects/SettingsValueObjects';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';

export class PostgresSettingsRepository implements ISettingsRepository {
  constructor(
    private readonly provider: PostgresProvider,
    private readonly cache: CacheProvider
  ) {}

  async findById(userId: string): Promise<Settings | null> {
    const cached = await this.cache.get(`settings:${userId}`);
    if (cached) return this.mapToDomain(JSON.parse(cached));

    const query = 'SELECT * FROM settings WHERE user_id = $1';
    const result = await this.provider.query(query, [userId]);
    if (result.rows.length === 0) return null;
    
    await this.cache.set(`settings:${userId}`, JSON.stringify(result.rows[0]), 3600);
    return this.mapToDomain(result.rows[0]);
  }

  async save(settings: Settings): Promise<void> {
    const query = `
      INSERT INTO settings (user_id, theme, timezone, locale, notifications_enabled, notification_preference, privacy_level, mfa_enabled)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (user_id) DO UPDATE SET
        theme = EXCLUDED.theme,
        timezone = EXCLUDED.timezone,
        locale = EXCLUDED.locale,
        notifications_enabled = EXCLUDED.notifications_enabled,
        notification_preference = EXCLUDED.notification_preference,
        privacy_level = EXCLUDED.privacy_level,
        mfa_enabled = EXCLUDED.mfa_enabled;
    `;
    await this.provider.query(query, [
      settings.userId,
      settings.themeSettings.theme.toString(),
      settings.languageSettings.timezone.toString(),
      settings.languageSettings.locale.toString(),
      settings.notificationSettings.enabled,
      settings.notificationSettings.preference.toString(),
      settings.privacySettings.level.toString(),
      settings.securitySettings.mfaEnabled
    ]);
    await this.cache.delete(`settings:${settings.userId}`);
  }

  private mapToDomain(row: any): Settings {
    return Settings.create({
      userId: row.user_id,
      themeSettings: ThemeSettings.create({ theme: new Theme(row.theme) }),
      notificationSettings: NotificationSettings.create({ enabled: row.notifications_enabled, preference: new NotificationPreference(row.notification_preference) }),
      privacySettings: PrivacySettings.create({ level: new PrivacyLevel(row.privacy_level) }),
      languageSettings: LanguageSettings.create({ locale: new Locale(row.locale), timezone: new Timezone(row.timezone) }),
      securitySettings: SecuritySettings.create({ mfaEnabled: row.mfa_enabled }),
      preferenceSettings: []
    }, new UniqueEntityId(row.user_id));
  }
}
