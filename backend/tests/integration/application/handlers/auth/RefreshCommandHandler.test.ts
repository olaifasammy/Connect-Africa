import { RefreshCommandHandler } from '@application/handlers/auth/RefreshCommandHandler';

describe('RefreshCommandHandler', () => {
  const mockJwt = { generateToken: jest.fn(), verifyToken: jest.fn() };
  const handler = new RefreshCommandHandler(mockJwt as any);

  it('should refresh token', async () => {
    mockJwt.verifyToken.mockReturnValue('user123');
    mockJwt.generateToken.mockReturnValue('new-token');
    
    const result = await handler.handle({ refreshToken: 'old-token' });
    expect(result).toBe('new-token');
  });
});
