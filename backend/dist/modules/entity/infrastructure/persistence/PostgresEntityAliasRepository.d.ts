import { Pool } from 'pg';
import { IEntityAliasRepository } from '../../../entity/domain/repositories/IEntityAliasRepository';
import { EntityAlias } from '../../../entity/domain/entities/EntityAlias';
import { EntityId } from '../../../entity/domain/value-objects/EntityId';
export declare class PostgresEntityAliasRepository implements IEntityAliasRepository {
    private readonly pool;
    constructor(pool: Pool);
    save(alias: EntityAlias): Promise<void>;
    delete(alias: EntityAlias): Promise<void>;
    findByEntityId(entityId: EntityId): Promise<EntityAlias[]>;
}
