import { UserProfile } from '../entities/UserProfile';
import { UserProfileId } from '../value-objects/UserProfileId';
import { UserId } from '../value-objects/UserId';

export interface IUserProfileRepository {
  findById(
    id: UserProfileId,
  ): Promise<UserProfile | null>;

  findByUserId(
    userId: UserId,
  ): Promise<UserProfile | null>;

  save(
    profile: UserProfile,
  ): Promise<void>;

  update(
    profile: UserProfile,
  ): Promise<void>;
}
