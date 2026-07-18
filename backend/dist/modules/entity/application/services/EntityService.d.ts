import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { Entity } from '../../../entity/domain/entities/Entity';
import { IEntityService } from '../../domain/interfaces/IEntityService';
export declare class EntityService implements IEntityService {
    private readonly entityRepository;
    constructor(entityRepository: IEntityRepository);
    findById(id: string): Promise<Entity | null>;
    save(entity: Entity): Promise<void>;
}
