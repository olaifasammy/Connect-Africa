import { UserProfile } from '@modules/auth/domain/entities/UserProfile';
import { UserId } from '@modules/auth/domain/value-objects/UserId';
import { UserProfileId } from '@modules/auth/domain/value-objects/UserProfileId';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('UserProfile', () => {
  it('should create a new user profile', () => {
    const userId = UserId.create(new UniqueEntityId().toString());
    const props = {
      userId,
      displayName: 'Test User',
      bio: 'Hello world',
    };
    const profile = UserProfile.create(props);

    expect(profile.displayName).toBe('Test User');
    expect(profile.userId.value).toBe(userId.value);
    expect(profile.bio).toBe('Hello world');
  });

  it('should update display name', () => {
    const userId = UserId.create(new UniqueEntityId().toString());
    const profile = UserProfile.create({
      userId,
      displayName: 'Old Name',
    });

    profile.updateProfile({ displayName: 'New Name' });
    expect(profile.displayName).toBe('New Name');
  });
});
