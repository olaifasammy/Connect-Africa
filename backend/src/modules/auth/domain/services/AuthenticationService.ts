import { User } from '../entities/User';
import { IPasswordHasher } from '../interfaces/IPasswordHasher';
import { IAuditLogger } from '../interfaces/IAuditLogger';

export class AuthenticationService {
  constructor(
    private passwordHasher: IPasswordHasher,
    private auditLogger: IAuditLogger
  ) {}

  async verifyPassword(user: User, password: string, ipAddress?: string): Promise<boolean> {
    const isValid = await this.passwordHasher.compare(password, user.passwordHash.value);

    this.auditLogger.log({
      user: user.id.toString(),
      action: 'PASSWORD_VERIFICATION',
      resource: 'User',
      status: isValid ? 'SUCCESS' : 'FAILURE',
      ipAddress: ipAddress || 'unknown',
    });

    return isValid;
  }
}
