import { IRelationshipRepository } from '../../domain/repositories/IRelationshipRepository';
import { Relationship } from '../../domain/entities/Relationship';
import { RelationshipId, EntityId, RelationshipTypeId } from '../../domain/value-objects/RelationshipValueObjects';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';

/**
 * PostgreSQL implementation of Relationship Repository.
 */
export class PostgresRelationshipRepository implements IRelationshipRepository {
  constructor(private readonly provider: PostgresProvider) {}

  async save(relationship: Relationship): Promise<void> {
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

  async findById(id: RelationshipId): Promise<Relationship | null> {
    const query = 'SELECT * FROM relationships WHERE id = $1';
    const result = await this.provider.query(query, [id.toString()]);
    if (result.rows.length === 0) return null;
    
    // Mapping logic from DB record to AggregateRoot
    const row = result.rows[0];
    return Relationship.reconstruct(
        new RelationshipId(row.id),
        new EntityId(row.source_id),
        new EntityId(row.target_id),
        new RelationshipTypeId(row.type_id),
        row.created_at
    );
  }

  async exists(relationship: Relationship): Promise<boolean> {
    const query = 'SELECT 1 FROM relationships WHERE source_id = $1 AND target_id = $2 AND type_id = $3';
    const result = await this.provider.query(query, [
      relationship.sourceEntityId.getProps().value,
      relationship.targetEntityId.getProps().value,
      relationship.relationshipTypeId.getProps().value
    ]);
    return result.rows.length > 0;
  }

  async delete(id: RelationshipId): Promise<void> {
    const query = 'DELETE FROM relationships WHERE id = $1';
    await this.provider.query(query, [id.toString()]);
  }

  async list(limit: number, offset: number): Promise<Relationship[]> {
    const query = 'SELECT * FROM relationships LIMIT $1 OFFSET $2';
    const result = await this.provider.query(query, [limit, offset]);
    
    // Mapping logic remains similar to findById, mapped for array
    return result.rows.map((row: any) => Relationship.reconstruct(
        new RelationshipId(row.id),
        new EntityId(row.source_id),
        new EntityId(row.target_id),
        new RelationshipTypeId(row.type_id),
        row.created_at
    ));
  }
}
