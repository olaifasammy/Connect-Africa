import { PermissionEvaluator } from '@domain/auth/policies/rbac/PermissionEvaluator';
import { Roles } from '@domain/auth/policies/rbac/Role';
import { Permission } from '@domain/auth/policies/rbac/Permissions';
import { AuthenticationError } from '@domain/auth/errors/AuthErrors';

describe('PermissionEvaluator', () => {
  it('should allow authorized role', () => {
    expect(() => PermissionEvaluator.evaluate(Roles.USER, Permission.USER_READ)).not.toThrow();
  });

  it('should deny unauthorized role', () => {
    expect(() => PermissionEvaluator.evaluate(Roles.USER, Permission.SESSION_MANAGE)).toThrow(AuthenticationError);
  });
});
