"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresRelationshipVersionRepository = void 0;
const RelationshipVersion_1 = require("../../domain/entities/RelationshipVersion");
const RelationshipValueObjects_1 = require("../../domain/value-objects/RelationshipValueObjects");
/**
 * PostgreSQL implementation of Relationship Version Repository.
 */
class PostgresRelationshipVersionRepository {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async save(version) {
        const query = `
      INSERT INTO relationship_versions (id, relationship_id, version_number, data, created_at)
      VALUES ($1, $2, $3, $4, $5);
    `;
        await this.provider.query(query, [
            version.id.toString(),
            version.relationshipId.toString(),
            version.versionNumber.getProps().value,
            JSON.stringify(version.data.getProps().value),
            version.createdAt,
        ]);
    }
    async findByRelationshipId(relationshipId) {
        const query = 'SELECT * FROM relationship_versions WHERE relationship_id = $1 ORDER BY version_number DESC';
        const result = await this.provider.query(query, [relationshipId.toString()]);
        // Mapping logic
        return result.rows.map((row) => new RelationshipVersion_1.RelationshipVersion({
            relationshipId: new RelationshipValueObjects_1.RelationshipId(row.relationship_id),
            versionNumber: new (require('../../domain/value-objects/RelationshipValueObjects').VersionNumber)(row.version_number),
            data: new (require('../../domain/value-objects/RelationshipValueObjects').Metadata)(row.data),
            createdAt: row.created_at
        }));
    }
}
exports.PostgresRelationshipVersionRepository = PostgresRelationshipVersionRepository;
//# sourceMappingURL=PostgresRelationshipVersionRepository.js.map