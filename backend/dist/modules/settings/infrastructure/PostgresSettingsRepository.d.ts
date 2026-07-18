import { ISettingsRepository } from '../domain/repositories/ISettingsRepository';
import { Settings } from '../domain/entities/Settings';
import { PostgresProvider } from '../../../shared/infrastructure/database/PostgresProvider';
import { CacheProvider } from '../../../shared/infrastructure/cache/CacheProvider';
export declare class PostgresSettingsRepository implements ISettingsRepository {
    private readonly provider;
    private readonly cache;
    constructor(provider: PostgresProvider, cache: CacheProvider);
    findById(userId: string): Promise<Settings | null>;
    save(settings: Settings): Promise<void>;
    private mapToDomain;
}
