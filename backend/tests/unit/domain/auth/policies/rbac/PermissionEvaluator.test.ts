import { PermissionEvaluator } from '@modules/auth/domain/policies/rbac/PermissionEvaluator';
import { Roles } from '@modules/auth/domain/policies/rbac/Role';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

describe('PermissionEvaluator', () => {
  it('should allow authorized role', () => {
    expect(() => PermissionEvaluator.evaluate(Roles.USER, Permission.USER_READ, 'user-id')).not.toThrow();
  });

  it('should deny unauthorized role', () => {
    expect(() => PermissionEvaluator.evaluate(Roles.USER, Permission.SESSION_MANAGE, 'user-id')).toThrow(AuthenticationError);
  });
});
