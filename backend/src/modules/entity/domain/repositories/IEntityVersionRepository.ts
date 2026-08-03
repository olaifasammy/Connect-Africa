import { EntityVersion } from '../entities/EntityVersion';

export interface IEntityVersionRepository {
  findById(id: string): Promise<EntityVersion | null>;
  save(version: EntityVersion): Promise<void>;
}
