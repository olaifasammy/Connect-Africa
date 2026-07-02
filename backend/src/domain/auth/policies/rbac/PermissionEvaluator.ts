import { Role } from './Role';
import { Permission } from './Permissions';
import { AuthenticationError } from '../errors/AuthErrors';

export class PermissionEvaluator {
  static evaluate(role: Role, requiredPermission: Permission): void {
    if (!role.hasPermission(requiredPermission)) {
      throw new AuthenticationError('Forbidden: Insufficient permissions');
    }
  }
}
