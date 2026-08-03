import { RegisterUserCommandHandler } from '../../../../application/handlers/RegisterUserCommandHandler';
import { RegisterUserCommand } from '../../../../application/commands/RegisterUserCommand';
import { IUserRepository } from '../../../../domain/repositories/UserRepository';
import { IPasswordHasher } from '../../../../domain/interfaces/IPasswordHasher';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserAlreadyExistsError } from '../../../../domain/errors/UserErrors';
import { Email } from '../../../../domain/value-objects/Email';
import { PasswordHash } from '../../../../domain/value-objects/PasswordHash';
import { User } from '../../../../domain/entities/User';

describe('RegisterUserCommandHandler', () => {
  let handler: RegisterUserCommandHandler;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockPasswordHasher: jest.Mocked<IPasswordHasher>;
  let mockEventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as any;
    mockPasswordHasher = { 
      hash: jest.fn(),
      compare: jest.fn() 
    };
    mockEventBus = { publish: jest.fn() } as any;

    handler = new RegisterUserCommandHandler(
      mockUserRepository,
      mockPasswordHasher,
      mockEventBus
    );
  });

  it('should successfully hash passwords, persist a new user aggregate root, and dispatch a UserRegisteredEvent when inputs pass validation', async () => {
    const command = new RegisterUserCommand('test@example.com', 'password123');
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockPasswordHasher.hash.mockResolvedValue('hashed_password');

    await handler.handle(command);

    expect(mockPasswordHasher.hash).toHaveBeenCalledWith('password123');
    expect(mockUserRepository.save).toHaveBeenCalledWith(expect.any(User));
    expect(mockEventBus.publish).toHaveBeenCalled();
  });

  it('should throw a ConflictException if the email address is already taken', async () => {
    const command = new RegisterUserCommand('test@example.com', 'password123');
    mockUserRepository.findByEmail.mockResolvedValue(new User({ email: new Email('test@example.com'), passwordHash: new PasswordHash('h'), isActive: false }));

    await expect(handler.handle(command)).rejects.toThrow(UserAlreadyExistsError);
    expect(mockEventBus.publish).toHaveBeenCalled();
  });
});
