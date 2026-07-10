import { EntityAlias } from '../entities/EntityAlias';
import { EntityId } from '../value-objects/EntityId';
export interface IEntityAliasRepository {
    save(alias: EntityAlias): Promise<void>;
    delete(alias: EntityAlias): Promise<void>;
    findByEntityId(entityId: EntityId): Promise<EntityAlias[]>;
}
