import { inject } from 'inversify';
import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { User } from '../entities/User';
import { IPasswordHasher } from '../interfaces/IPasswordHasher';
import { IAuditLogger } from '../interfaces/IAuditLogger';
import { IAuthenticationService } from '../interfaces/IAuthenticationService';

@provide(AuthenticationService, true)
@injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @inject('IPasswordHasher') private passwordHasher: IPasswordHasher,
    @inject('IAuditLogger') private auditLogger: IAuditLogger
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
