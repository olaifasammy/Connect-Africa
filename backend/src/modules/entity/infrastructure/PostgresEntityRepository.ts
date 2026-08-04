import { IEntityRepository } from '@modules/entity/domain/repositories/IEntityRepository';
import { Entity } from '@modules/entity/domain/entities/Entity';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { EntityName } from '@modules/entity/domain/value-objects/EntityName';
import { EntityMetadata } from '@modules/entity/domain/value-objects/EntityMetadata';
import { Pool } from 'pg';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { SlugGenerationService } from '@modules/entity/domain/services/SlugGenerationService';

export class PostgresEntityRepository implements IEntityRepository {
  constructor(private readonly pool: Pool) {}

  async save(entity: Entity): Promise<void> {
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

  async findById(id: EntityId): Promise<Entity | null> {
    const res = await this.pool.query('SELECT * FROM entities WHERE id = $1', [id.value]);
    if (res.rows.length === 0) return null;
    
    const row = res.rows[0];
    return Entity.rehydrate(
      new UniqueEntityId(row.id),
      EntityName.create(row.name),
      row.type,
      EntityMetadata.create({ description: row.description, source: row.source, tags: row.tags }),
      'DRAFT',
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const slugService = new SlugGenerationService();
    const res = await this.pool.query('SELECT name FROM entities');
    return res.rows.some(row => slugService.generate(EntityName.create(row.name)) === slug);
  }

  async findBySlug(slug: string): Promise<Entity | null> {
    const slugService = new SlugGenerationService();
    const res = await this.pool.query('SELECT * FROM entities');
    
    for (const row of res.rows) {
      if (slugService.generate(EntityName.create(row.name)) === slug) {
        return Entity.rehydrate(
          new UniqueEntityId(row.id),
          EntityName.create(row.name),
          row.type,
          EntityMetadata.create({ description: row.description, source: row.source, tags: row.tags }),
          'DRAFT',
          new Date(row.created_at),
          new Date(row.updated_at)
        );

      }
    }
    return null;
  }

  async findByIdentifier(identifier: string): Promise<Entity | null> {
    const query = `
      SELECT e.* FROM entities e
      JOIN entity_identifiers ei ON e.id = ei.entity_id
      WHERE ei.external_id = $1
    `;
    const res = await this.pool.query(query, [identifier]);
    if (res.rows.length === 0) return null;
    
    const row = res.rows[0];
    return Entity.rehydrate(
      new UniqueEntityId(row.id),
      EntityName.create(row.name),
      row.type,
      EntityMetadata.create({ description: row.description, source: row.source, tags: row.tags }),
      'DRAFT',
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async findAll(page: number, limit: number): Promise<Entity[]> {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM entities LIMIT $1 OFFSET $2`;
    const res = await this.pool.query(query, [limit, offset]);
    
    return res.rows.map(row => Entity.rehydrate(
      new UniqueEntityId(row.id),
      EntityName.create(row.name),
      row.type,
      EntityMetadata.create({ description: row.description, source: row.source, tags: row.tags }),
      'DRAFT',
      new Date(row.created_at),
      new Date(row.updated_at)
    ));
  }

  async search(term: string): Promise<Entity[]> {
    const query = `SELECT * FROM entities WHERE name ILIKE $1 OR description ILIKE $1`;
    const res = await this.pool.query(query, [`%${term}%`]);
    
    return res.rows.map(row => Entity.rehydrate(
      new UniqueEntityId(row.id),
      EntityName.create(row.name),
      row.type,
      EntityMetadata.create({ description: row.description, source: row.source, tags: row.tags }),
      'DRAFT',
      new Date(row.created_at),
      new Date(row.updated_at)
    ));
  }


  async delete(id: EntityId): Promise<void> {
    await this.pool.query('DELETE FROM entities WHERE id = $1', [id.value]);
  }
}
