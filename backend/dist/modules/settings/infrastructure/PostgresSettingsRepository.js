"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresSettingsRepository = void 0;
const Settings_1 = require("../domain/entities/Settings");
const UniqueEntityId_1 = require("../../../shared/domain/UniqueEntityId");
const SettingsValueObjects_1 = require("../domain/value-objects/SettingsValueObjects");
const ThemeSettings_1 = require("../domain/entities/ThemeSettings");
const NotificationSettings_1 = require("../domain/entities/NotificationSettings");
const PrivacySettings_1 = require("../domain/entities/PrivacySettings");
const LanguageSettings_1 = require("../domain/entities/LanguageSettings");
const SecuritySettings_1 = require("../domain/entities/SecuritySettings");
const SettingsValueObjects_2 = require("../domain/value-objects/SettingsValueObjects");
class PostgresSettingsRepository {
    provider;
    cache;
    constructor(provider, cache) {
        this.provider = provider;
        this.cache = cache;
    }
    async findById(userId) {
        const cached = await this.cache.get(`settings:${userId}`);
        if (cached)
            return this.mapToDomain(JSON.parse(cached));
        const query = 'SELECT * FROM settings WHERE user_id = $1';
        const result = await this.provider.query(query, [userId]);
        if (result.rows.length === 0)
            return null;
        await this.cache.set(`settings:${userId}`, JSON.stringify(result.rows[0]), 3600);
        return this.mapToDomain(result.rows[0]);
    }
    async save(settings) {
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
    mapToDomain(row) {
        return Settings_1.Settings.create({
            userId: row.user_id,
            themeSettings: ThemeSettings_1.ThemeSettings.create({ theme: new SettingsValueObjects_1.Theme(row.theme) }),
            notificationSettings: NotificationSettings_1.NotificationSettings.create({ enabled: row.notifications_enabled, preference: new SettingsValueObjects_2.NotificationPreference(row.notification_preference) }),
            privacySettings: PrivacySettings_1.PrivacySettings.create({ level: new SettingsValueObjects_2.PrivacyLevel(row.privacy_level) }),
            languageSettings: LanguageSettings_1.LanguageSettings.create({ locale: new SettingsValueObjects_1.Locale(row.locale), timezone: new SettingsValueObjects_1.Timezone(row.timezone) }),
            securitySettings: SecuritySettings_1.SecuritySettings.create({ mfaEnabled: row.mfa_enabled }),
            preferenceSettings: []
        }, new UniqueEntityId_1.UniqueEntityId(row.user_id));
    }
}
exports.PostgresSettingsRepository = PostgresSettingsRepository;
//# sourceMappingURL=PostgresSettingsRepository.js.map