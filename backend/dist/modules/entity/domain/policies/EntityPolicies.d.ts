import { Entity } from '../entities/Entity';
import { IEntityPolicy } from './IEntityPolicy';
export declare class EntityPublishingPolicy implements IEntityPolicy {
    validate(entity: Entity): Promise<void>;
}
export declare class EntityArchivingPolicy implements IEntityPolicy {
    validate(entity: Entity): Promise<void>;
}
export declare class DuplicateEntityPolicy implements IEntityPolicy {
    validate(entity: Entity): Promise<void>;
}
export declare class CanonicalEntityPolicy implements IEntityPolicy {
    validate(entity: Entity): Promise<void>;
}
