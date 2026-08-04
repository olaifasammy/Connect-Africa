import { Pool } from 'pg';
import { IEntityVersionRepository } from '@modules/entity/domain/repositories/IEntityVersionRepository';
import { EntityVersion } from '@modules/entity/domain/entities/EntityVersion';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { VersionNumber } from '@modules/entity/domain/value-objects/EntityValueObjects';
import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class PostgresEntityVersionRepository implements IEntityVersionRepository {
  constructor(private readonly pool: Pool) {}
  
  async findById(id: string): Promise<EntityVersion | null> {
    const res = await this.pool.query('SELECT * FROM entity_versions WHERE id = $1', [id]);
    if (res.rows.length === 0) return null;
    const row = res.rows[0];
    return EntityVersion.create({
        entityId: EntityId.create(row.entity_id),
        versionNumber: new VersionNumber(row.version_number),
        metadata: EntityMetadata.create({ description: row.metadata.description, source: row.metadata.source, tags: row.metadata.tags }),
        createdAt: new Date(row.created_at)
    }, new UniqueEntityId(row.id));
  }
  
  async save(version: EntityVersion): Promise<void> {
    const query = `
      INSERT INTO entity_versions (id, entity_id, version_number, metadata, created_at)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await this.pool.query(query, [
        version.id.toString(), 
        version.entityId.value, 
        version.versionNumber.value, 
        JSON.stringify({ description: version.metadata.description, source: version.metadata.source, tags: version.metadata.tags }), 
        version.createdAt
    ]);
  }
}
