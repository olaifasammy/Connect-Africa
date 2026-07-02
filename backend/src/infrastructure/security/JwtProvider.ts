import * as jwt from 'jsonwebtoken';
import { IJwtProvider } from '@domain/auth/interfaces/IJwtProvider';
import { appConfig } from '@config/app';

export class JwtProvider implements IJwtProvider {
  private readonly secret = appConfig.jwt.secret;
  private readonly expiration = appConfig.jwt.expiration;

  generateToken(userId: string): string {
    return jwt.sign({ userId }, this.secret, { expiresIn: this.expiration });
  }

  verifyToken(token: string): string {
    try {
      const decoded = jwt.verify(token, this.secret) as { userId: string };
      return decoded.userId;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
