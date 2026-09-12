import { User } from '../../src/modules/auth/domain/entities/User';
import { Email } from '../../src/modules/auth/domain/value-objects/Email';
import { PasswordHash } from '../../src/modules/auth/domain/value-objects/PasswordHash';
import { UniqueEntityId } from '../../src/shared/domain/UniqueEntityId';

export class UserFactory {
  static create(props: Partial<{ id: string; email: string; password: string }> = {}): User {
    const id = new UniqueEntityId(props.id);
    const email = new Email(props.email || 'test@example.com');
    const passwordHash = new PasswordHash(props.password || 'passwordHash');
    return new User({
      email,
      passwordHash,
      isActive: true,
      role: 'USER'
    }, id);
  }
}
