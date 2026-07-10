import { Entity } from '../entities/Entity';

export interface IEntityValidationService {
  validate(entity: Entity): Promise<void>;
}
