import { Request, Response, NextFunction } from 'express';
import { Permission } from '../../../../modules/auth/domain/policies/rbac/Permissions';
export declare const authorize: (permission: Permission) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
