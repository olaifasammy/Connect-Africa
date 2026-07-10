import { CreateUserCommandHandler } from '@modules/auth/application/handlers/CreateUserCommandHandler';
import { CreateUserCommand } from '@modules/auth/application/commands/CreateUserCommand';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';
import { IAuditRepository } from '@modules/audit/domain/repositories/IAuditRepository';
import { EventBus } from '@infrastructure/queue/EventBus';

describe('CreateUserCommandHandler', () => {
  let handler: CreateUserCommandHandler;
  let userRepository: jest.Mocked<IUserRepository>;
  let passwordHasher: jest.Mocked<IPasswordHasher>;
  let auditRepository: jest.Mocked<IAuditRepository>;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    userRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    } as any;
    passwordHasher = { hash: jest.fn(), compare: jest.fn() };
    auditRepository = { log: jest.fn() };
    eventBus = { publish: jest.fn(), subscribe: jest.fn() } as any;

    handler = new CreateUserCommandHandler(
      userRepository,
      passwordHasher,
      auditRepository,
      eventBus
    );
  });

  it('should create a user successfully', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    passwordHasher.hash.mockResolvedValue('hashed_password');

    const command = new CreateUserCommand('test@connectafrica.com', 'password123');
    await handler.handle(command);

    expect(userRepository.save).toHaveBeenCalled();
    expect(auditRepository.log).toHaveBeenCalled();
    expect(eventBus.publish).toHaveBeenCalled();
  });
});
