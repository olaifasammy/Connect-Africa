"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserSettingsRepository = void 0;
const UserSettings_1 = require("../domain/entities/UserSettings");
const UserId_1 = require("../../auth/domain/value-objects/UserId");
const UniqueEntityId_1 = require("../../../shared/domain/UniqueEntityId");
class PostgresUserSettingsRepository {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async findById(id) {
        const query = 'SELECT * FROM user_settings WHERE id = $1';
        const result = await this.provider.query(query, [id.toString()]);
        if (result.rows.length === 0)
            return null;
        return this.mapToDomain(result.rows[0]);
    }
    async findByUserId(userId) {
        const query = 'SELECT * FROM user_settings WHERE user_id = $1';
        const result = await this.provider.query(query, [userId.value]);
        if (result.rows.length === 0)
            return null;
        return this.mapToDomain(result.rows[0]);
    }
    async save(entity) {
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
    async delete(id) {
        const query = 'DELETE FROM user_settings WHERE id = $1';
        await this.provider.query(query, [id.toString()]);
    }
    mapToDomain(row) {
        return UserSettings_1.UserSettings.create({
            userId: UserId_1.UserId.create(row.user_id),
            theme: row.theme,
            notificationsEnabled: row.notifications_enabled,
            updatedAt: row.updated_at
        }, new UniqueEntityId_1.UniqueEntityId(row.id));
    }
}
exports.PostgresUserSettingsRepository = PostgresUserSettingsRepository;
//# sourceMappingURL=PostgresUserSettingsRepository.js.map