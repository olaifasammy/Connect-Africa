import { Entity } from '../entities/Entity';
export interface IEntityPolicy {
    validate(entity: Entity): Promise<void>;
}
