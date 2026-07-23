import { User } from '../../../../domain/entities/User';
import { Email } from '../../../../domain/value-objects/Email';
import { PasswordHash } from '../../../../domain/value-objects/PasswordHash';
import { UniqueEntityId } from '../../../../../../shared/domain/UniqueEntityId';

describe('User Entity', () => {
  it('should create a new user with valid properties', () => {
    const email = new Email('test@example.com');
    const passwordHash = new PasswordHash('hashed_password');
    const user = new User({ email, passwordHash, isActive: false });

    expect(user.email.value).toBe('test@example.com');
    expect(user.passwordHash.value).toBe('hashed_password');
    expect(user.isActive).toBe(false);
  });

  it('should activate a user', () => {
    const email = new Email('test@example.com');
    const passwordHash = new PasswordHash('hashed_password');
    const user = new User({ email, passwordHash, isActive: false });

    user.activate();
    expect(user.isActive).toBe(true);
  });

  it('should ban a user', () => {
    const email = new Email('test@example.com');
    const passwordHash = new PasswordHash('hashed_password');
    const user = new User({ email, passwordHash, isActive: true });

    user.ban();
    expect(user.isActive).toBe(false);
  });
});
