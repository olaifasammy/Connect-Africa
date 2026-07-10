import { ISettingsRepository } from '../domain/repositories/ISettingsRepository';
import { UserSettings } from '../domain/entities/UserSettings';
import { UserId } from '../../auth/domain/value-objects/UserId';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { PostgresProvider } from '../../../shared/infrastructure/database/PostgresProvider';
export declare class PostgresUserSettingsRepository implements ISettingsRepository {
    private readonly provider;
    constructor(provider: PostgresProvider);
    findById(id: UniqueEntityId): Promise<UserSettings | null>;
    findByUserId(userId: UserId): Promise<UserSettings | null>;
    save(entity: UserSettings): Promise<void>;
    delete(id: UniqueEntityId): Promise<void>;
    private mapToDomain;
}
