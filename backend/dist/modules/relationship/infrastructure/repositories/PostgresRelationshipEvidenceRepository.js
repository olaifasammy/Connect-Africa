"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresRelationshipEvidenceRepository = void 0;
const RelationshipEvidence_1 = require("../../domain/entities/RelationshipEvidence");
const RelationshipValueObjects_1 = require("../../domain/value-objects/RelationshipValueObjects");
/**
 * PostgreSQL implementation of Relationship Evidence Repository.
 */
class PostgresRelationshipEvidenceRepository {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async save(evidence) {
        const query = `
      INSERT INTO relationship_evidence (id, relationship_id, source_uri, description, created_at)
      VALUES ($1, $2, $3, $4, $5);
    `;
        await this.provider.query(query, [
            evidence.id.toString(),
            evidence.relationshipId.toString(),
            evidence.sourceUri,
            evidence.description,
            evidence.createdAt,
        ]);
    }
    async findByRelationshipId(relationshipId) {
        const query = 'SELECT * FROM relationship_evidence WHERE relationship_id = $1';
        const result = await this.provider.query(query, [relationshipId.toString()]);
        // Mapping logic
        return result.rows.map((row) => new RelationshipEvidence_1.RelationshipEvidence({
            relationshipId: new RelationshipValueObjects_1.RelationshipId(row.relationship_id),
            sourceUri: row.source_uri,
            description: row.description,
            createdAt: row.created_at
        }));
    }
}
exports.PostgresRelationshipEvidenceRepository = PostgresRelationshipEvidenceRepository;
//# sourceMappingURL=PostgresRelationshipEvidenceRepository.js.map