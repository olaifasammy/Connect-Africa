import { Pool } from 'pg';
import { IEntityVersionRepository } from '@modules/entity/domain/repositories/IEntityVersionRepository';
import { EntityVersion } from '@modules/entity/domain/entities/EntityVersion';

export class PostgresEntityVersionRepository implements IEntityVersionRepository {
  constructor(private readonly pool: Pool) {}
  
  async findById(id: string): Promise<EntityVersion | null> {
    // Implementation details...
    return null;
  }
  
  async save(version: EntityVersion): Promise<void> {
    // Implementation details...
  }
}
