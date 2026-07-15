import 'reflect-metadata';
import { LoginCommandHandler } from '@modules/auth/application/handlers/LoginCommandHandler';
import { User } from '@modules/auth/domain/entities/User';
import { Email } from '@modules/auth/domain/value-objects/Email';
import { PasswordHash } from '@modules/auth/domain/value-objects/PasswordHash';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

describe('LoginCommandHandler', () => {
  const mockUserRepo = {
    save: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
  };
  const mockHasher = { hash: jest.fn(), compare: jest.fn() };
  const mockJwt = { generateToken: jest.fn(), verifyToken: jest.fn() };

  const mockEventBus = {
    publish: jest.fn(),
  };
  const mockAuditRepository = {
    save: jest.fn(),
    log: jest.fn(),
  };
  
  const handler = new LoginCommandHandler(
    mockUserRepo as any,
    mockHasher as any,
    mockJwt as any,
    mockAuditRepository as any,
    mockEventBus as any,
  );

  it('should return token for valid credentials', async () => {
    const user = new User({ email: new Email('test@test.com'), passwordHash: new PasswordHash('hash') });
    mockUserRepo.findByEmail.mockResolvedValue(user);
    mockHasher.compare.mockResolvedValue(true);
    mockJwt.generateToken.mockReturnValue('token');

    const result = await handler.handle({ email: 'test@test.com', password: 'password' });
    expect(result).toBe('token');
  });
});
