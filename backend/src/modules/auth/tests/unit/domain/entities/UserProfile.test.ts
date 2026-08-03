import { UserProfile } from '../../../../domain/entities/UserProfile';
import { UserId } from '../../../../domain/value-objects/UserId';
import { UserProfileId } from '../../../../domain/value-objects/UserProfileId';

describe('UserProfile Entity', () => {
  it('should create a valid user profile', () => {
    const userId = UserId.create('user-id-123');
    const profileId = UserProfileId.create('profile-id-123');
    const profile = UserProfile.create({ 
      userId, 
      displayName: 'John Doe'
    }, profileId);

    expect(profile.userId.value).toBe('user-id-123');
    expect(profile.displayName).toBe('John Doe');
  });
});
