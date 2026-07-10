import { AuthenticationService } from '@modules/auth/domain/services/AuthenticationService';
import { User } from '@modules/auth/domain/entities/User';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Email } from '@modules/auth/domain/value-objects/Email';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let passwordHasher: jest.Mocked<IPasswordHasher>;

  beforeEach(() => {
    passwordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };
    authenticationService = new AuthenticationService(passwordHasher);
  });

  it('should return true for valid password', async () => {
    const user = new User({
      email: new Email('test@test.com'),
      passwordHash: new PasswordHash('hashed_password'),
      isActive: true,
    }, new UniqueEntityId());

    passwordHasher.compare.mockResolvedValue(true);

    const result = await authenticationService.verifyPassword(user, 'plain_password');
    expect(result).toBe(true);
    expect(passwordHasher.compare).toHaveBeenCalledWith('plain_password', 'hashed_password');
  });

  it('should return false for invalid password', async () => {
    const user = new User({
      email: new Email('test@test.com'),
      passwordHash: new PasswordHash('hashed_password'),
      isActive: true,
    }, new UniqueEntityId());

    passwordHasher.compare.mockResolvedValue(false);

    const result = await authenticationService.verifyPassword(user, 'wrong_password');
    expect(result).toBe(false);
  });
});
