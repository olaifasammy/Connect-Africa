import { IEntityVersionRepository } from '../../../entity/domain/repositories/IEntityVersionRepository';
import { EntityVersion } from '../../../entity/domain/entities/EntityVersion';
export declare class EntityVersionService {
    private readonly versionRepository;
    constructor(versionRepository: IEntityVersionRepository);
    findById(id: string): Promise<EntityVersion | null>;
}
