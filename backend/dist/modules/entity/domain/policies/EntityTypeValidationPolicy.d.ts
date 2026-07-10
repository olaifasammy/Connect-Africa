import { Entity } from '../entities/Entity';
import { IEntityPolicy } from './IEntityPolicy';
/**
 * Policy to validate entity types.
 */
export declare class EntityTypeValidationPolicy implements IEntityPolicy {
    validate(entity: Entity): Promise<void>;
}
