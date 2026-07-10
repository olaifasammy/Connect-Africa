import { PostgresUserRepository } from '@modules/auth/infrastructure/PostgresUserRepository';
import { User } from '@modules/auth/domain/entities/User';
import { Email } from '@modules/auth/domain/value-objects/Email';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@infrastructure/database/PostgresProvider';
import { Pool } from 'pg';

describe('PostgresUserRepository Integration', () => {
  let pool: Pool;
  let userRepository: PostgresUserRepository;

  beforeAll(async () => {
    pool = PostgresProvider.getPool();
    userRepository = new PostgresUserRepository(pool);
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should save and find a user', async () => {
    const user = new User({
      email: new Email('integration@test.com'),
      passwordHash: new PasswordHash('hashed_password'),
      isActive: true,
    }, new UniqueEntityId());

    await userRepository.save(user);

    const foundUser = await userRepository.findByEmail('integration@test.com');
    expect(foundUser).not.toBeNull();
    expect(foundUser?.email.value).toBe('integration@test.com');
  });
});
