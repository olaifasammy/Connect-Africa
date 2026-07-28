import { Request, Response, NextFunction } from 'express';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';
import { PermissionEvaluator } from '@modules/auth/domain/policies/rbac/PermissionEvaluator';
import { Roles, Role } from '@modules/auth/domain/policies/rbac/Role';

export const authorize = (permission: Permission) => (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'User not authenticated' }] });
  }

  try {
    const userRoleIdentifier = (user as any).role || Roles.USER.name;
    const role = (Roles as any)[userRoleIdentifier] || Roles.USER;
    PermissionEvaluator.evaluate(role, permission, user.id.toString());
    next();
  } catch (err: any) {
    res.status(403).json({ success: false, errors: [{ code: 'FORBIDDEN', message: err.message }] });
  }
};

export const authorizeRole = (role: Role) => (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'User not authenticated' }] });
  }

  const userRoleIdentifier = (user as any).role || Roles.USER.name;
  const userRole = (Roles as any)[userRoleIdentifier] || Roles.USER;
  if (userRole !== role) {
    return res.status(403).json({ success: false, errors: [{ code: 'FORBIDDEN', message: 'Insufficient role' }] });
  }
  next();
};
