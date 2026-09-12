import { Router } from 'express';
import { ProviderController } from '../controllers/ProviderController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
import { AiAuthorizationMiddleware } from '../../infrastructure/security/AiAuthorizationMiddleware';
import { AiAuditMiddleware } from '../../infrastructure/security/AiAuditMiddleware';

export const createProviderRoutes = (controller: ProviderController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();
  const middlewares = [authMiddleware.authenticate, AiAuditMiddleware, AiAuthorizationMiddleware];

  router.get('/', ...middlewares, (req, res) => controller.list(req, res));
  router.post('/', ...middlewares, (req, res) => controller.create(req, res));
  router.get('/:id/health', ...middlewares, (req, res) => controller.getHealth(req, res));
  
  return router;
};
