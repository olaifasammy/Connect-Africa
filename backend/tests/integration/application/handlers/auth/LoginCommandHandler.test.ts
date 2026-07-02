import 'reflect-metadata';
import { LoginCommandHandler } from '@application/handlers/auth/LoginCommandHandler';
import { User } from '@domain/auth/entities/User';
import { Email } from '@domain/auth/value-objects/Email';
import { PasswordHash } from '@domain/auth/value-objects/PasswordHash';
import { UniqueEntityId } from '@domain/shared/UniqueEntityId';

describe('LoginCommandHandler', () => {
  const mockUserRepo = {
    save: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
  };
  const mockHasher = { hash: jest.fn(), compare: jest.fn() };
  const mockJwt = { generateToken: jest.fn(), verifyToken: jest.fn() };

  const handler = new LoginCommandHandler(mockUserRepo as any, mockHasher as any, mockJwt as any);

  it('should return token for valid credentials', async () => {
    const user = new User({ email: new Email('test@test.com'), passwordHash: new PasswordHash('hash') });
    mockUserRepo.findByEmail.mockResolvedValue(user);
    mockHasher.compare.mockResolvedValue(true);
    mockJwt.generateToken.mockReturnValue('token');

    const result = await handler.handle({ email: 'test@test.com', password: 'password' });
    expect(result).toBe('token');
  });
});
