import { ISettingsRepository } from '../domain/repositories/ISettingsRepository';
import { Settings } from '../domain/entities/Settings';
import { PostgresProvider } from '../../../shared/infrastructure/database/PostgresProvider';
export declare class PostgresSettingsRepository implements ISettingsRepository {
    private readonly provider;
    constructor(provider: PostgresProvider);
    findById(userId: string): Promise<Settings | null>;
    save(settings: Settings): Promise<void>;
    private mapToDomain;
}
