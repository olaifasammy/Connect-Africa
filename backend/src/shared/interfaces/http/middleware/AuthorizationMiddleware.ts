import { Request, Response, NextFunction } from 'express';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';
import { PermissionEvaluator } from '@modules/auth/domain/policies/rbac/PermissionEvaluator';
import { Roles } from '@modules/auth/domain/policies/rbac/Role';

export const authorize = (permission: Permission) => (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'User not authenticated' }] });
  }

  try {
    // For test scenarios, we allow bypassing via a special header or test environment check
    if (process.env.NODE_ENV === 'test' && req.headers['x-test-role']) {
        const role = (Roles as any)[req.headers['x-test-role'] as string] || Roles.USER;
        PermissionEvaluator.evaluate(role, permission, user.id.toString());
        next();
        return;
    }

    const userRole = (user as any).role || Roles.USER; 
    PermissionEvaluator.evaluate(userRole, permission, user.id.toString());
    next();
  } catch (err: any) {
    res.status(403).json({ success: false, errors: [{ code: 'FORBIDDEN', message: err.message }] });
  }
};
