import { EnableMfaCommandHandler } from '@modules/auth/application/handlers/mfa/EnableMfaCommandHandler';

describe('EnableMfaCommandHandler', () => {
  it('should generate MFA secret', async () => {
    const mockRepo = { save: jest.fn(), findById: jest.fn(), findByEmail: jest.fn() };
    const mockTotp = { generateSecret: jest.fn().mockReturnValue('SECRET123'), generateUrl: jest.fn(), verifyCode: jest.fn() };
    const mockAudit = { log: jest.fn() };
    const mockEvent = { publish: jest.fn() };

    const handler = new EnableMfaCommandHandler(mockRepo as any, mockTotp as any, mockAudit as any, mockEvent as any);
    const result = await handler.handle({ userId: 'user1' });

    expect(result.secret).toBe('SECRET123');
    expect(mockAudit.log).toHaveBeenCalled();
  });
});
