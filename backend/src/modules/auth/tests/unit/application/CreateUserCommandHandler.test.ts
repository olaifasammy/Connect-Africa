import { RegisterUserCommandHandler } from '@modules/auth/application/handlers/RegisterUserCommandHandler';
import { RegisterUserCommand } from '@modules/auth/application/commands/RegisterUserCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';
import { EventBus } from '@shared/infrastructure/queue/EventBus';

describe('RegisterUserCommandHandler', () => {
  let handler: RegisterUserCommandHandler;
  let userRepository: jest.Mocked<IUserRepository>;
  let passwordHasher: jest.Mocked<IPasswordHasher>;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    } as any;
    passwordHasher = { hash: jest.fn(), compare: jest.fn() };
    eventBus = { publish: jest.fn(), subscribe: jest.fn() } as any;

    handler = new RegisterUserCommandHandler(
      userRepository,
      passwordHasher,
      eventBus
    );
  });

  it('should create a user successfully', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    passwordHasher.hash.mockResolvedValue('hashed_password');

    const command = new RegisterUserCommand('test@connectafrica.com', 'password123', '127.0.0.1');
    await handler.handle(command);

    expect(userRepository.save).toHaveBeenCalled();
    expect(eventBus.publish).toHaveBeenCalled();
  });
});
