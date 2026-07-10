import { User } from '@modules/auth/domain/entities/User';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Email } from '@modules/auth/domain/value-objects/Email';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';

describe('User', () => {
  it('should create a valid user', () => {
    const email = new Email('test@connectafrica.com');
    const passwordHash = new PasswordHash('hashed_password');
    const user = new User({ email, passwordHash }, new UniqueEntityId());

    expect(user.email.value).toBe('test@connectafrica.com');
    expect(user.passwordHash.value).toBe('hashed_password');
  });
});
