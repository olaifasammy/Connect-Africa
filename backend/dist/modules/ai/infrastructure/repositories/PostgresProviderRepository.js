"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresProviderRepository = void 0;
const Provider_1 = require("../../domain/entities/Provider");
class PostgresProviderRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async save(provider) {
        await this.db.query('INSERT INTO providers (id, name, is_enabled, priority) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, is_enabled = EXCLUDED.is_enabled, priority = EXCLUDED.priority', [provider.id, provider.name, provider.isEnabled, provider.priority]);
    }
    async findById(id) {
        const result = await this.db.query('SELECT * FROM providers WHERE id = $1', [id]);
        if (result.rows.length === 0)
            return null;
        const row = result.rows[0];
        return new Provider_1.Provider(row.id, row.name, row.is_enabled, row.priority);
    }
    async findAllEnabled() {
        const result = await this.db.query('SELECT * FROM providers WHERE is_enabled = true');
        return result.rows.map(row => new Provider_1.Provider(row.id, row.name, row.is_enabled, row.priority));
    }
}
exports.PostgresProviderRepository = PostgresProviderRepository;
//# sourceMappingURL=PostgresProviderRepository.js.map