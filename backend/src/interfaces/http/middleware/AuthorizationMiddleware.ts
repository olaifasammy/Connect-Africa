import { Request, Response, NextFunction } from 'express';
import { Permission } from '@domain/auth/policies/rbac/Permissions';
import { PermissionEvaluator } from '@domain/auth/policies/rbac/PermissionEvaluator';
import { Roles } from '@domain/auth/policies/rbac/Role';

export const authorize = (permission: Permission) => (req: Request, res: Response, next: NextFunction) => {
  // Mocking user role extraction from JWT/Session (to be fully integrated with T-05.5)
  const userRole = Roles.USER; 
  try {
    PermissionEvaluator.evaluate(userRole, permission);
    next();
  } catch (err: any) {
    res.status(403).json({ error: 'Forbidden', message: err.message });
  }
};
