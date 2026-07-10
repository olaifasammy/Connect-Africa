import { Entity } from '../entities/Entity';
import { IEntityPolicy } from './IEntityPolicy';
export declare class EntityNameUniquenessPolicy implements IEntityPolicy {
    private readonly entityRepository;
    constructor(entityRepository: any);
    validate(entity: Entity): Promise<void>;
}
