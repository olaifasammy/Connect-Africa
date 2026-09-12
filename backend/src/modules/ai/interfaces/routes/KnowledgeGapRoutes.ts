import { Router } from 'express';
import { KnowledgeGapController } from '../controllers/KnowledgeGapController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
import { AiAuthorizationMiddleware } from '../../infrastructure/security/AiAuthorizationMiddleware';
import { AiAuditMiddleware } from '../../infrastructure/security/AiAuditMiddleware';

export const createKnowledgeGapRoutes = (controller: KnowledgeGapController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();
  const middlewares = [authMiddleware.authenticate, AiAuditMiddleware, AiAuthorizationMiddleware];

  router.get('/', ...middlewares, (req, res) => controller.list(req, res));
  router.post('/', ...middlewares, (req, res) => controller.create(req, res));
  
  return router;
};
