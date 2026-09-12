import { Router } from 'express';
import { PromptController } from '../controllers/PromptController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
import { AiAuthorizationMiddleware } from '../../infrastructure/security/AiAuthorizationMiddleware';
import { AiAuditMiddleware } from '../../infrastructure/security/AiAuditMiddleware';

export const createPromptRoutes = (controller: PromptController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();
  const middlewares = [authMiddleware.authenticate, AiAuditMiddleware, AiAuthorizationMiddleware];
  
  router.get('/', ...middlewares, (req, res) => controller.list(req, res));
  router.post('/', ...middlewares, (req, res) => controller.create(req, res));
  router.put('/:id', ...middlewares, (req, res) => controller.update(req, res));
  router.delete('/:id', ...middlewares, (req, res) => controller.delete(req, res));
  
  return router;
};
