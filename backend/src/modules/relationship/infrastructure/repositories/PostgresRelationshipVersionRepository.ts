import { IRelationshipVersionRepository } from '../../domain/repositories/IRelationshipVersionRepository';
import { RelationshipVersion } from '../../domain/entities/RelationshipVersion';
import { RelationshipId } from '../../domain/value-objects/RelationshipValueObjects';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

/**
 * PostgreSQL implementation of Relationship Version Repository.
 */
export class PostgresRelationshipVersionRepository implements IRelationshipVersionRepository {
  constructor(private readonly provider: PostgresProvider) {}

  async save(version: RelationshipVersion): Promise<void> {
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

  async findByRelationshipId(relationshipId: RelationshipId): Promise<RelationshipVersion[]> {
    const query = 'SELECT * FROM relationship_versions WHERE relationship_id = $1 ORDER BY version_number DESC';
    const result = await this.provider.query(query, [relationshipId.toString()]);
    
    // Mapping logic
    return result.rows.map((row: any) => new RelationshipVersion({
        relationshipId: new RelationshipId(row.relationship_id),
        versionNumber: new (require('../../domain/value-objects/RelationshipValueObjects').VersionNumber)(row.version_number),
        data: new (require('../../domain/value-objects/RelationshipValueObjects').Metadata)(row.data),
        createdAt: row.created_at
    }));
  }
}
