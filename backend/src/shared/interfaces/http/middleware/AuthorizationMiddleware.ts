import { Request, Response, NextFunction } from 'express';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';
import { PermissionEvaluator } from '@modules/auth/domain/policies/rbac/PermissionEvaluator';

export const authorize = (permission: Permission) => (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, errors: [{ code: 'UNAUTHORIZED', message: 'User not authenticated' }] });
  }

  try {
    // Assuming user has roles available, need to ensure User aggregate has roles
    // For now, this is a placeholder for the real role extraction
    const userRole = (user as any).role || 'USER'; 
    PermissionEvaluator.evaluate(userRole, permission, user.id.toString());
    next();
  } catch (err: any) {
    res.status(403).json({ success: false, errors: [{ code: 'FORBIDDEN', message: err.message }] });
  }
};
