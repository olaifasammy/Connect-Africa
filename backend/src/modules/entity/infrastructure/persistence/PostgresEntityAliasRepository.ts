import { Pool } from 'pg';
import { IEntityAliasRepository } from '@modules/entity/domain/repositories/IEntityAliasRepository';
import { EntityAlias } from '@modules/entity/domain/entities/EntityAlias';
import { EntityId } from '@modules/entity/domain/value-objects/EntityId';

export class PostgresEntityAliasRepository implements IEntityAliasRepository {
  constructor(private readonly pool: Pool) {}
  
  async save(alias: EntityAlias): Promise<void> {
    // Implementation details...
  }
  
  async delete(alias: EntityAlias): Promise<void> {
    // Implementation details...
  }
  
  async findByEntityId(entityId: EntityId): Promise<EntityAlias[]> {
    // Implementation details...
    return [];
  }
}
