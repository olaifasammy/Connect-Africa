import { IEntityRepository } from '../../../entity/domain/repositories/IEntityRepository';
import { Entity } from '../../../entity/domain/entities/Entity';
export declare class EntityService {
    private readonly entityRepository;
    constructor(entityRepository: IEntityRepository);
    findById(id: string): Promise<Entity | null>;
    save(entity: Entity): Promise<void>;
}
