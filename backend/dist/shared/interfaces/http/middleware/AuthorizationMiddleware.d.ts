import { Request, Response, NextFunction } from 'express';
import { Permission } from '../../../../modules/auth/domain/policies/rbac/Permissions';
import { Role } from '../../../../modules/auth/domain/policies/rbac/Role';
export declare const authorize: (permission: Permission) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const authorizeRole: (role: Role) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
