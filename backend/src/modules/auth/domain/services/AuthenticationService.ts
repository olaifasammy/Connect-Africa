import { User } from '../entities/User';
import { IPasswordHasher } from '../interfaces/IPasswordHasher';
import { AuditLogger } from '../../infrastructure/AuditLogger';

export class AuthenticationService {
  constructor(private passwordHasher: IPasswordHasher) {}

  async verifyPassword(user: User, password: string, ipAddress?: string): Promise<boolean> {
    const isValid = await this.passwordHasher.compare(password, user.passwordHash.value);

    AuditLogger.log({
      user: user.id.toString(),
      action: 'PASSWORD_VERIFICATION',
      resource: 'User',
      status: isValid ? 'SUCCESS' : 'FAILURE',
      ipAddress,
    });

    return isValid;
  }
}
