"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresEntityRepository = void 0;
const Entity_1 = require("../../entity/domain/entities/Entity");
const EntityName_1 = require("../../entity/domain/value-objects/EntityName");
const EntityMetadata_1 = require("../../entity/domain/value-objects/EntityMetadata");
const UniqueEntityId_1 = require("../../../shared/domain/UniqueEntityId");
class PostgresEntityRepository {
    pool;
    constructor(pool) {
        this.pool = pool;
    }
    async save(entity) {
        const query = `
      INSERT INTO entities (id, name, type, description, source, tags)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, type = EXCLUDED.type, description = EXCLUDED.description, source = EXCLUDED.source, tags = EXCLUDED.tags
    `;
        await this.pool.query(query, [
            entity.entityId.value,
            entity.name.value,
            entity.type,
            entity.metadata.description,
            entity.metadata.source,
            JSON.stringify(entity.metadata.tags)
        ]);
    }
    async findById(id) {
        const res = await this.pool.query('SELECT * FROM entities WHERE id = $1', [id.value]);
        if (res.rows.length === 0)
            return null;
        const row = res.rows[0];
        return Entity_1.Entity.rehydrate(new UniqueEntityId_1.UniqueEntityId(row.id), EntityName_1.EntityName.create(row.name), row.type, EntityMetadata_1.EntityMetadata.create({ description: row.description, source: row.source, tags: row.tags }), new Date(row.created_at), new Date(row.updated_at));
    }
    async existsBySlug(slug) {
        throw new Error('Not implemented');
    }
    async findBySlug(slug) {
        throw new Error('Not implemented');
    }
    async findByIdentifier(identifier) {
        throw new Error('Not implemented');
    }
    async findAll(page, limit) {
        throw new Error('Not implemented');
    }
    async search(term) {
        throw new Error('Not implemented');
    }
    async delete(id) {
        await this.pool.query('DELETE FROM entities WHERE id = $1', [id.value]);
    }
}
exports.PostgresEntityRepository = PostgresEntityRepository;
//# sourceMappingURL=PostgresEntityRepository.js.map