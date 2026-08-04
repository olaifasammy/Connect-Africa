import { Pool } from 'pg';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { EntityAlias } from '@modules/entity/domain/entities/EntityAlias';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';
import { AliasName } from '@modules/entity/domain/value-objects/EntityValueObjects';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class PostgresEntityAliasRepository implements IEntityAliasRepository {
  constructor(private readonly pool: Pool) {}
  
  async save(alias: EntityAlias): Promise<void> {
    const query = `
      INSERT INTO entity_aliases (id, entity_id, alias, created_at)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO UPDATE SET alias = EXCLUDED.alias
    `;
    await this.pool.query(query, [alias.id.toString(), alias.entityId.value, alias.name.value, alias.createdAt]);
  }
  
  async delete(alias: EntityAlias): Promise<void> {
    await this.pool.query('DELETE FROM entity_aliases WHERE id = $1', [alias.id.toString()]);
  }
  
  async findByEntityId(entityId: EntityId): Promise<EntityAlias[]> {
    const res = await this.pool.query('SELECT * FROM entity_aliases WHERE entity_id = $1', [entityId.value]);
    return res.rows.map(row => new EntityAlias({
        entityId: EntityId.create(row.entity_id),
        name: AliasName.create(row.alias),
        createdAt: new Date(row.created_at)
    }, new UniqueEntityId(row.id)));
  }
}
