import { BanUserCommandHandler } from '../../../application/handlers/BanUserCommandHandler';
import { BanUserCommand } from '../../../application/commands/BanUserCommand';
import { IUserRepository } from '../../../domain/repositories/UserRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { User } from '../../../domain/entities/User';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { Email } from '../../../domain/value-objects/Email';
import { PasswordHash } from '../../../domain/value-objects/PasswordHash';
import { AuthenticationError } from '../../../domain/errors/AuthErrors';
import { AuditLogger } from '../../../infrastructure/AuditLogger';

describe('BanUserCommandHandler', () => {
  let handler: BanUserCommandHandler;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockEventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    mockUserRepository = { findById: jest.fn(), save: jest.fn(), findByEmail: jest.fn() } as any;
    mockEventBus = { publish: jest.fn() } as any;
    handler = new BanUserCommandHandler(mockUserRepository, mockEventBus);
    jest.spyOn(AuditLogger, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should ban a user successfully', async () => {
    const userIdToBan = new UniqueEntityId().toString();
    const user = new User({ email: new Email('test@test.com'), passwordHash: new PasswordHash('hash'), isActive: true }, new UniqueEntityId(userIdToBan));
    mockUserRepository.findById.mockResolvedValue(user);

    const command = new BanUserCommand('admin-id', userIdToBan, '127.0.0.1');
    await handler.handle(command);

    expect(user.isActive).toBe(false);
    expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    expect(mockEventBus.publish).toHaveBeenCalled();
    expect(AuditLogger.log).toHaveBeenCalledWith(expect.objectContaining({ status: 'SUCCESS' }));
  });

  it('should throw AuthenticationError and log failure if user not found', async () => {
    mockUserRepository.findById.mockResolvedValue(null);

    const command = new BanUserCommand('admin-id', 'non-existent-id', '127.0.0.1');
    await expect(handler.handle(command)).rejects.toThrow(AuthenticationError);
    expect(AuditLogger.log).toHaveBeenCalledWith(expect.objectContaining({ status: 'FAILURE' }));
  });
});
