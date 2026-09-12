import { Router } from 'express';
import { CrawlController } from '../controllers/CrawlController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
import { validate } from '../../../../shared/interfaces/http/middleware/ZodValidationMiddleware';
import { StartCrawlSchema } from './CrawlValidation';
import { AiAuthorizationMiddleware } from '../../infrastructure/security/AiAuthorizationMiddleware';
import { AiAuditMiddleware } from '../../infrastructure/security/AiAuditMiddleware';

export const createCrawlRoutes = (crawlController: CrawlController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();

  router.post(
    '/start',
    authMiddleware.authenticate,
    AiAuditMiddleware,
    AiAuthorizationMiddleware,
    validate(StartCrawlSchema),
    (req, res) => crawlController.start(req, res)
  );

  return router;
};
