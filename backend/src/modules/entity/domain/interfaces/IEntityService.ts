import { Entity } from '../entities/Entity';

export interface IEntityService {
  findById(id: string): Promise<Entity | null>;
  save(entity: Entity): Promise<void>;
}
