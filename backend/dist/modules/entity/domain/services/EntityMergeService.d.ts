import { IEntityMergeService } from './IEntityMergeService';
import { IEntityRepository } from '../repositories/IEntityRepository';
import { Entity } from '../entities/Entity';
export declare class EntityMergeService implements IEntityMergeService {
    private readonly entityRepository;
    constructor(entityRepository: IEntityRepository);
    merge(sourceEntityId: string, targetEntityId: string): Promise<Entity>;
}
