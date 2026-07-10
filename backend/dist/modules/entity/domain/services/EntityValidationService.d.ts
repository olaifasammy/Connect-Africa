import { Entity } from '../entities/Entity';
import { IEntityValidationService } from './IEntityValidationService';
import { IEntityRepository } from '../repositories/IEntityRepository';
export declare class EntityValidationService implements IEntityValidationService {
    private readonly entityRepository;
    private readonly policies;
    constructor(entityRepository: IEntityRepository);
    validate(entity: Entity): Promise<void>;
}
