import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { UserSettings } from '../entities/UserSettings';
import { UserId } from '../../../auth/domain/value-objects/UserId';
export interface ISettingsRepository {
    findById(id: UniqueEntityId): Promise<UserSettings | null>;
    findByUserId(userId: UserId): Promise<UserSettings | null>;
    save(entity: UserSettings): Promise<void>;
    delete(id: UniqueEntityId): Promise<void>;
}
