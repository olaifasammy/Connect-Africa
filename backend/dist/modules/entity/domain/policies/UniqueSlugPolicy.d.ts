import { Entity } from '../entities/Entity';
import { IEntityRepository } from '../repositories/IEntityRepository';
import { IEntityPolicy } from './IEntityPolicy';
/**
 * Policy to validate unique entity slugs.
 */
export declare class UniqueSlugPolicy implements IEntityPolicy {
    private readonly repository;
    constructor(repository: IEntityRepository);
    validate(entity: Entity): Promise<void>;
}
