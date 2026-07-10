import { Entity } from '../entities/Entity';
import { IDuplicateDetectionService } from './IDuplicateDetectionService';
import { IEntityRepository } from '../repositories/IEntityRepository';
export declare class DuplicateDetectionService implements IDuplicateDetectionService {
    private readonly entityRepository;
    constructor(entityRepository: IEntityRepository);
    isDuplicate(entity: Entity): Promise<boolean>;
}
