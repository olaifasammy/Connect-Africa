import { PostgresUserRepository } from '../../../../infrastructure/PostgresUserRepository';
import { TestDatabase } from '../../../../../../../tests/helpers/TestDatabase';
import { User } from '../../../../domain/entities/User';
import { Email } from '../../../../domain/value-objects/Email';
import { PasswordHash } from '../../../../domain/value-objects/PasswordHash';
import { UniqueEntityId } from '../../../../../../shared/domain/UniqueEntityId';

describe('PostgresUserRepository Integration', () => {
  jest.setTimeout(30000);
  const db = new TestDatabase();
  let userRepository: PostgresUserRepository;

  beforeAll(async () => {
    await db.start();
    userRepository = new PostgresUserRepository(db.getPool());
  });

  afterAll(async () => {
    await db.stop();
  });

  it('should save and find a user', async () => {
    const user = new User({ 
      email: new Email('integration@test.com'), 
      passwordHash: new PasswordHash('hash'), 
      isActive: true 
    }, new UniqueEntityId());

    await userRepository.save(user);
    
    const foundUser = await userRepository.findByEmail('integration@test.com');
    expect(foundUser).not.toBeNull();
    expect(foundUser!.email.value).toBe('integration@test.com');
  });
});
