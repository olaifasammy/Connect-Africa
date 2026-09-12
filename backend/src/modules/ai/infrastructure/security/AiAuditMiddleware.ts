import { Request, Response, NextFunction } from 'express';
import { AuditLogger } from '../../../../shared/infrastructure/logging/AuditLogger';

export const AiAuditMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as Request & { user?: { id: string } }).user;
  AuditLogger.log({
    user: user?.id || 'anonymous',
    action: `AI_${req.method}_${req.originalUrl}`,
    resource: 'AI_GATEWAY',
    status: 'SUCCESS'
  });
  next();
};
