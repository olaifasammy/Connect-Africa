import * as jwt from 'jsonwebtoken';
import { IJwtProvider } from '@modules/auth/domain/interfaces/IJwtProvider';
import { appConfig } from '@config/app';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';

export class JwtProvider implements IJwtProvider {
  private readonly secret = appConfig.jwt.secret;
  private readonly expiration = appConfig.jwt.expiration;

  generateToken(userId: string): string {
    const token = jwt.sign({ userId }, this.secret, { expiresIn: this.expiration });
    
    AuditLogger.log({
      user: userId,
      action: 'TOKEN_GENERATION',
      resource: 'AUTH',
      status: 'SUCCESS'
    });

    return token;
  }

  verifyToken(token: string): string {
    try {
      const decoded = jwt.verify(token, this.secret) as { userId: string };
      return decoded.userId;
    } catch (error) {
      AuditLogger.log({
        user: 'UNKNOWN',
        action: 'TOKEN_VERIFICATION',
        resource: 'AUTH',
        status: 'FAILURE'
      });
      throw new AuthenticationError('Invalid or expired token');
    }
  }
}
