import { EnableMfaCommandHandler } from '@modules/auth/application/handlers/mfa/EnableMfaCommandHandler';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';

jest.mock('@modules/auth/infrastructure/AuditLogger');

describe('EnableMfaCommandHandler', () => {
  it('should generate MFA secret', async () => {
    const mockRepo = { save: jest.fn(), findById: jest.fn(), findByEmail: jest.fn() };
    const mockTotp = { generateSecret: jest.fn().mockReturnValue('SECRET123'), generateUrl: jest.fn(), verifyCode: jest.fn() };
    const mockEvent = { publish: jest.fn() };

    const handler = new EnableMfaCommandHandler(mockRepo as any, mockTotp as any, mockEvent as any);
    const result = await handler.handle({ userId: 'user1' });

    expect(result.secret).toBe('SECRET123');
    expect(AuditLogger.log).toHaveBeenCalled();
  });
});
