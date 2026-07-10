import { UserSettings } from '../entities/UserSettings';
import { UserId } from '../value-objects/UserId';
export interface IUserSettingsRepository {
    findByUserId(userId: UserId): Promise<UserSettings | null>;
    save(settings: UserSettings): Promise<void>;
    update(settings: UserSettings): Promise<void>;
}
