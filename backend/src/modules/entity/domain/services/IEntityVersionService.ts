import { Entity } from '../entities/Entity';
import { EntityVersion } from '../entities/EntityVersion';

export interface IEntityVersionService {
  createVersion(entity: Entity): Promise<EntityVersion>;
}
