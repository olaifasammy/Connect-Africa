import { Role } from './Role';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';

export class AdminPolicy {
  static isAdmin(role: Role, userId: string): void {
    const isAdmin = role.name === 'ADMIN';

    AuditLogger.log({
      user: userId,
      action: 'ADMIN_CHECK',
      resource: 'SYSTEM',
      status: isAdmin ? 'SUCCESS' : 'FAILURE'
    });

    if (!isAdmin) {
      throw new AuthenticationError('Forbidden: Admin access required');
    }
  }
}
