import { ISourceRepository } from '../../domain/repositories/ISourceRepository';
import { Source } from '../../domain/entities/Source';
import { SourceId } from '../../domain/value-objects/SourceValueObjects';
import { CacheProvider } from '../../../../shared/infrastructure/cache/CacheProvider';
export declare class CachedSourceRepository implements ISourceRepository {
    private readonly repository;
    private readonly cache;
    private readonly ttl;
    constructor(repository: ISourceRepository, cache: CacheProvider, ttl?: number);
    findById(id: SourceId): Promise<Source | null>;
    save(source: Source): Promise<void>;
    delete(id: SourceId): Promise<void>;
}
