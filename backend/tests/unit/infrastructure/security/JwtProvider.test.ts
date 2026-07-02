import { JwtProvider } from '@infrastructure/security/JwtProvider';

describe('JwtProvider', () => {
  it('should generate and verify token', () => {
    const jwtProvider = new JwtProvider('super-secret-key-that-is-long-enough-32-chars');
    const token = jwtProvider.generateToken('user123');
    
    expect(jwtProvider.verifyToken(token)).toBe('user123');
  });
});
