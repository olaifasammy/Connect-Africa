import { VerifyEmailCommandHandler } from '../../../../application/handlers/VerifyEmailCommandHandler';
import { VerifyEmailCommand } from '../../../../application/commands/VerifyEmailCommand';
import { IUserRepository } from '../../../../domain/repositories/UserRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuthenticationError } from '../../../../domain/errors/AuthErrors';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { User } from '../../../../domain/entities/User';
import { Email } from '../../../../domain/value-objects/Email';
import { PasswordHash } from '../../../../domain/value-objects/PasswordHash';

describe('VerifyEmailCommandHandler', () => {
  let handler: VerifyEmailCommandHandler;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockEventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    mockUserRepository = { 
        findById: jest.fn(), 
        save: jest.fn(),
        findByEmail: jest.fn() 
    } as any;
    mockEventBus = { publish: jest.fn() } as any;

    handler = new VerifyEmailCommandHandler(
      mockUserRepository,
      mockEventBus
    );
  });

  it('should transition the user account status to Verified when provided a valid token', async () => {
    const userId = new UniqueEntityId();
    const user = new User({ email: new Email('test@test.com'), passwordHash: new PasswordHash('h'), isActive: false }, userId);
    
    mockUserRepository.findById.mockResolvedValue(user);
    
    await handler.handle(new VerifyEmailCommand(userId.toString(), 'token123', '127.0.0.1'));
    
    expect(user.isActive).toBe(true);
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockEventBus.publish).toHaveBeenCalled();
  });

  it('should throw an AuthenticationError if the user is not found', async () => {
    mockUserRepository.findById.mockResolvedValue(null);
    
    await expect(handler.handle(new VerifyEmailCommand('invalid-id', 'token123', '127.0.0.1')))
        .rejects.toThrow(AuthenticationError);
  });
});
