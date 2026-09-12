import { Router } from 'express';
import { AiController } from '../controllers/AiController';
import { AiAuditMiddleware } from '../../infrastructure/security/AiAuditMiddleware';
import { AiAuthorizationMiddleware } from '../../infrastructure/security/AiAuthorizationMiddleware';
import { AiRateLimitMiddleware } from '../../infrastructure/security/AiRateLimitMiddleware';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';

export const createAiRoutes = (aiController: AiController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();

  router.post(
    '/process',
    AiRateLimitMiddleware,
    authMiddleware.authenticate,
    AiAuditMiddleware,
    AiAuthorizationMiddleware,
    (req, res) => aiController.process(req, res)
  );

  return router;
};
