import { Role } from './Role';
import { Permission } from './Permissions';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger';

export class PermissionEvaluator {
  static evaluate(role: Role, requiredPermission: Permission, userId: string): void {
    const hasPermission = role.hasPermission(requiredPermission);

    AuditLogger.log({
      user: userId,
      action: 'PERMISSION_CHECK',
      resource: requiredPermission,
      status: hasPermission ? 'SUCCESS' : 'FAILURE'
    });

    if (!hasPermission) {
      throw new AuthenticationError('Forbidden: Insufficient permissions');
    }
  }
}
