import { IRelationshipEvidenceRepository } from '../../domain/repositories/IRelationshipEvidenceRepository';
import { RelationshipEvidence } from '../../domain/entities/RelationshipEvidence';
import { RelationshipId } from '../../domain/value-objects/RelationshipValueObjects';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

/**
 * PostgreSQL implementation of Relationship Evidence Repository.
 */
export class PostgresRelationshipEvidenceRepository implements IRelationshipEvidenceRepository {
  constructor(private readonly provider: PostgresProvider) {}

  async save(evidence: RelationshipEvidence): Promise<void> {
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

  async findByRelationshipId(relationshipId: RelationshipId): Promise<RelationshipEvidence[]> {
    const query = 'SELECT * FROM relationship_evidence WHERE relationship_id = $1';
    const result = await this.provider.query(query, [relationshipId.toString()]);
    
    // Mapping logic
    return result.rows.map((row: any) => new RelationshipEvidence({
        relationshipId: new RelationshipId(row.relationship_id),
        sourceUri: row.source_uri,
        description: row.description,
        createdAt: row.created_at
    }));
  }
}
