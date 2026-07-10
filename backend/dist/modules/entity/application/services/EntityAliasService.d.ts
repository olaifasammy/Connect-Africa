import { IEntityAliasRepository } from '../../../entity/domain/repositories/IEntityAliasRepository';
import { EntityAlias } from '../../../entity/domain/entities/EntityAlias';
export declare class EntityAliasService {
    private readonly aliasRepository;
    constructor(aliasRepository: IEntityAliasRepository);
    findByEntityId(entityId: string): Promise<EntityAlias[]>;
}
