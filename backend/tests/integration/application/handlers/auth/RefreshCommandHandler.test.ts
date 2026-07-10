import { RefreshCommandHandler } from '@modules/auth/application/handlers/RefreshCommandHandler';

describe('RefreshCommandHandler', () => {
  const mockJwt = { generateToken: jest.fn(), verifyToken: jest.fn() };
  const mockAudit = { log: jest.fn() };
  const handler = new RefreshCommandHandler(mockJwt as any, mockAudit as any);

  it('should refresh token', async () => {
    mockJwt.verifyToken.mockReturnValue('user123');
    mockJwt.generateToken.mockReturnValue('new-token');
    
    const result = await handler.handle({ refreshToken: 'old-token', userId: 'user123' } as any);
    expect(result).toBe('new-token');
  });
});
