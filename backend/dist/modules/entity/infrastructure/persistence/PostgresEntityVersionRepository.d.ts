import { Pool } from 'pg';
import { IEntityVersionRepository } from '../../../entity/domain/repositories/IEntityVersionRepository';
import { EntityVersion } from '../../../entity/domain/entities/EntityVersion';
export declare class PostgresEntityVersionRepository implements IEntityVersionRepository {
    private readonly pool;
    constructor(pool: Pool);
    findById(id: string): Promise<EntityVersion | null>;
    save(version: EntityVersion): Promise<void>;
}
