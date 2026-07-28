import { LoginCommandHandler } from '../../../../application/handlers/LoginCommandHandler';
import { LoginCommand } from '../../../../application/commands/LoginCommand';
import { IUserRepository } from '../../../../domain/repositories/UserRepository';
import { IPasswordHasher } from '../../../../domain/interfaces/IPasswordHasher';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { User } from '../../../../domain/entities/User';
import { Email } from '../../../../domain/value-objects/Email';
import { PasswordHash } from '../../../../domain/value-objects/PasswordHash';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('LoginCommandHandler', () => {
  let handler: LoginCommandHandler;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockPasswordHasher: jest.Mocked<IPasswordHasher>;
  let mockEventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    mockUserRepository = { findByEmail: jest.fn() } as any;
    mockPasswordHasher = { compare: jest.fn() } as any;
    const mockJwtProvider = { generateToken: jest.fn().mockResolvedValue('token') } as any;
    mockEventBus = { publish: jest.fn() } as any;

    handler = new LoginCommandHandler(
      mockUserRepository,
      mockPasswordHasher,
      mockJwtProvider,
      mockEventBus
    );
  });

  it('should issue tokens if credentials match and MFA is disabled', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const user = new User({ email: new Email(email), passwordHash: new PasswordHash('hashed_password'), isActive: true }, new UniqueEntityId());
    
    mockUserRepository.findByEmail.mockResolvedValue(user);
    mockPasswordHasher.compare.mockResolvedValue(true);

    const result = await handler.handle(new LoginCommand(email, password));
    
    expect(result).toBe('token');
  });
});
