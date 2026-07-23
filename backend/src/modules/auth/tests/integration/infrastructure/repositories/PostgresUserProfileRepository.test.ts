import { PostgresUserProfileRepository } from '../../../../infrastructure/PostgresUserProfileRepository';
import { PostgresUserRepository } from '../../../../infrastructure/PostgresUserRepository';
import { TestDatabase } from '../../../../../../../tests/helpers/TestDatabase';
import { User } from '../../../../domain/entities/User';
import { UserProfile } from '../../../../domain/entities/UserProfile';
import { UserProfileId } from '../../../../domain/value-objects/UserProfileId';
import { UserId } from '../../../../domain/value-objects/UserId';
import { Email } from '../../../../domain/value-objects/Email';
import { PasswordHash } from '../../../../domain/value-objects/PasswordHash';
import { UniqueEntityId } from '../../../../../../shared/domain/UniqueEntityId';

describe('PostgresUserProfileRepository Integration', () => {
  jest.setTimeout(30000);
  const db = new TestDatabase();
  let userProfileRepository: PostgresUserProfileRepository;
  let userRepository: PostgresUserRepository;

  beforeAll(async () => {
    await db.start();
    userProfileRepository = new PostgresUserProfileRepository(db.getPool());
    userRepository = new PostgresUserRepository(db.getPool());
  });

  afterAll(async () => {
    await db.stop();
  });

  async function createDummyUser(): Promise<User> {
    const user = new User({ 
      email: new Email(`test-${new UniqueEntityId().toString()}@example.com`), 
      passwordHash: new PasswordHash('hash'), 
      isActive: true 
    }, new UniqueEntityId());
    await userRepository.save(user);
    return user;
  }

  it('should save and find a user profile', async () => {
    const user = await createDummyUser();
    const profile = UserProfile.create({
      userId: UserId.create(user.id.toString()),
      displayName: 'Test User',
      avatarUrl: 'http://avatar.url',
      bio: 'Test bio',
      expertise: ['JS'],
      researchInterests: ['Node']
    }, UserProfileId.create(new UniqueEntityId().toString()));

    await userProfileRepository.save(profile);
    
    const foundProfile = await userProfileRepository.findById(UserProfileId.create(profile.id.toString()));
    expect(foundProfile).not.toBeNull();
    expect(foundProfile!.displayName).toBe('Test User');
    expect(foundProfile!.userId.value).toBe(profile.userId.value);
  });

  it('should update a user profile', async () => {
    const user = await createDummyUser();
    const profile = UserProfile.create({
      userId: UserId.create(user.id.toString()),
      displayName: 'Original Name',
      avatarUrl: 'http://avatar.url',
      bio: 'Bio',
      expertise: ['JS'],
      researchInterests: ['Node']
    }, UserProfileId.create(new UniqueEntityId().toString()));

    await userProfileRepository.save(profile);
    
    profile.updateProfile({ displayName: 'Updated Name' });
    await userProfileRepository.update(profile);
    
    const foundProfile = await userProfileRepository.findById(UserProfileId.create(profile.id.toString()));
    expect(foundProfile!.displayName).toBe('Updated Name');
  });
});
