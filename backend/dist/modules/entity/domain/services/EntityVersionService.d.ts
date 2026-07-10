import { Entity } from '../entities/Entity';
import { EntityVersion } from '../entities/EntityVersion';
import { IEntityVersionService } from './IEntityVersionService';
import { IEntityVersionRepository } from '../repositories/IEntityVersionRepository';
export declare class EntityVersionService implements IEntityVersionService {
    private readonly entityVersionRepository;
    constructor(entityVersionRepository: IEntityVersionRepository);
    createVersion(entity: Entity): Promise<EntityVersion>;
}
