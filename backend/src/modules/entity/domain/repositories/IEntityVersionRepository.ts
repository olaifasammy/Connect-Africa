import { EntityVersion } from '../entities/EntityVersion';
import { EntityId } from '../value-objects/EntityId';

export interface IEntityVersionRepository {
  findById(id: string): Promise<EntityVersion | null>;

  findByEntityIdAndVersionId(
    entityId: EntityId,
    versionId: string
  ): Promise<EntityVersion | null>;

  /**
   * Returns the next version number for an Entity.
   *
   * This operation must be executed inside an active transaction.
   * The infrastructure implementation is responsible for locking
   * the Entity/version scope so concurrent version creation cannot
   * allocate the same number.
   */
  getNextVersionNumber(entityId: EntityId): Promise<number>;

  save(version: EntityVersion): Promise<void>;
}