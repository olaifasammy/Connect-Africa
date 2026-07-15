"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresSettingsRepository = void 0;
const Settings_1 = require("../domain/entities/Settings");
const UniqueEntityId_1 = require("../../../shared/domain/UniqueEntityId");
const SettingsValueObjects_1 = require("../domain/value-objects/SettingsValueObjects");
class PostgresSettingsRepository {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async findById(userId) {
        const query = 'SELECT * FROM settings WHERE user_id = $1';
        const result = await this.provider.query(query, [userId]);
        if (result.rows.length === 0)
            return null;
        return this.mapToDomain(result.rows[0]);
    }
    async save(settings) {
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
    mapToDomain(row) {
        return new Settings_1.Settings({
            userId: row.user_id,
            theme: new SettingsValueObjects_1.Theme(row.theme),
            timezone: new SettingsValueObjects_1.Timezone(row.timezone),
            locale: new SettingsValueObjects_1.Locale(row.locale)
        }, new UniqueEntityId_1.UniqueEntityId(row.user_id));
    }
}
exports.PostgresSettingsRepository = PostgresSettingsRepository;
//# sourceMappingURL=PostgresSettingsRepository.js.map