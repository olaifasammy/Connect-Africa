import { User } from '@modules/auth/domain/entities/User';
import { Email } from '@modules/auth/domain/value-objects/Email';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('User', () => {
  it('should create a new user and emit UserCreatedEvent', () => {
    const email = new Email('test@example.com');
    const passwordHash = new PasswordHash('hashed_password');
    const user = new User({ email, passwordHash, isActive: true });

    expect(user.email.value).toBe('test@example.com');
    expect(user.passwordHash.value).toBe('hashed_password');
    expect(user.domainEvents).toHaveLength(1);
    expect(user.domainEvents[0].constructor.name).toBe('UserCreatedEvent');
  });
});
