import { PostgresUserRepository } from '@modules/auth/infrastructure/PostgresUserRepository';
import { User } from '@modules/auth/domain/entities/User';
import { Email } from '@modules/auth/domain/value-objects/Email';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { Pool } from 'pg';

describe('PostgresUserRepository Integration', () => {
  let pgProvider: PostgresProvider;
  let pool: Pool;
  let userRepository: PostgresUserRepository;

  beforeAll(async () => {
    pgProvider = new PostgresProvider();
    pool = pgProvider.pool;
    await pool.query("DELETE FROM users WHERE email = $1", ["integration@test.com"]);
    userRepository = new PostgresUserRepository(pool);
  });

  afterAll(async () => {
    await pgProvider.disconnect();
  });

  it('should save and find a user', async () => {
    const user = new User({
      email: new Email('integration@test.com'),
      passwordHash: new PasswordHash('hash'),
      isActive: true,
      role: 'USER'
    }, new UniqueEntityId());


    await userRepository.save(user);

    const foundUser = await userRepository.findByEmail('integration@test.com');
    expect(foundUser).not.toBeNull();
    expect(foundUser?.email.value).toBe('integration@test.com');
  });
});
