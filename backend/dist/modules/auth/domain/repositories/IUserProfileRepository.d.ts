import { UserProfile } from '../entities/UserProfile';
import { UserProfileId } from '../value-objects/UserProfileId';
export interface IUserProfileRepository {
    findById(id: UserProfileId): Promise<UserProfile | null>;
    save(profile: UserProfile): Promise<void>;
    update(profile: UserProfile): Promise<void>;
}
