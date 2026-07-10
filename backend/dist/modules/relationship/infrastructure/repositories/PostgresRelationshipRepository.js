"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresRelationshipRepository = void 0;
const Relationship_1 = require("../../domain/entities/Relationship");
const RelationshipValueObjects_1 = require("../../domain/value-objects/RelationshipValueObjects");
/**
 * PostgreSQL implementation of Relationship Repository.
 */
class PostgresRelationshipRepository {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async save(relationship) {
        const query = `
      INSERT INTO relationships (id, source_id, target_id, type_id, created_at)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (id) DO UPDATE SET
        source_id = EXCLUDED.source_id,
        target_id = EXCLUDED.target_id,
        type_id = EXCLUDED.type_id;
    `;
        await this.provider.query(query, [
            relationship.id.toString(),
            relationship.sourceEntityId.getProps().value,
            relationship.targetEntityId.getProps().value,
            relationship.relationshipTypeId.getProps().value,
            relationship.createdAt,
        ]);
    }
    async findById(id) {
        const query = 'SELECT * FROM relationships WHERE id = $1';
        const result = await this.provider.query(query, [id.toString()]);
        if (result.rows.length === 0)
            return null;
        // Mapping logic from DB record to AggregateRoot
        const row = result.rows[0];
        return Relationship_1.Relationship.reconstruct(new RelationshipValueObjects_1.RelationshipId(row.id), new RelationshipValueObjects_1.EntityId(row.source_id), new RelationshipValueObjects_1.EntityId(row.target_id), new RelationshipValueObjects_1.RelationshipTypeId(row.type_id), row.created_at);
    }
    async exists(relationship) {
        const query = 'SELECT 1 FROM relationships WHERE source_id = $1 AND target_id = $2 AND type_id = $3';
        const result = await this.provider.query(query, [
            relationship.sourceEntityId.getProps().value,
            relationship.targetEntityId.getProps().value,
            relationship.relationshipTypeId.getProps().value
        ]);
        return result.rows.length > 0;
    }
    async delete(id) {
        const query = 'DELETE FROM relationships WHERE id = $1';
        await this.provider.query(query, [id.toString()]);
    }
    async list(limit, offset) {
        const query = 'SELECT * FROM relationships LIMIT $1 OFFSET $2';
        const result = await this.provider.query(query, [limit, offset]);
        // Mapping logic remains similar to findById, mapped for array
        return result.rows.map((row) => Relationship_1.Relationship.reconstruct(new RelationshipValueObjects_1.RelationshipId(row.id), new RelationshipValueObjects_1.EntityId(row.source_id), new RelationshipValueObjects_1.EntityId(row.target_id), new RelationshipValueObjects_1.RelationshipTypeId(row.type_id), row.created_at));
    }
}
exports.PostgresRelationshipRepository = PostgresRelationshipRepository;
//# sourceMappingURL=PostgresRelationshipRepository.js.map