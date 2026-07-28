import { Router } from 'express';
import { AiController } from '../controllers/AiController';
import { AiAuditMiddleware } from '../../infrastructure/security/AiAuditMiddleware';
import { AiAuthorizationMiddleware } from '../../infrastructure/security/AiAuthorizationMiddleware';
import { AiRateLimitMiddleware } from '../../infrastructure/security/AiRateLimitMiddleware';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
import { ProcessAiRequestHandler } from '../../application/handlers/ProcessAiRequestHandler';
import { GeminiProvider } from '../../infrastructure/providers/GeminiProvider';
import { container } from '../../../../bootstrap/container/container';
import { GetCurrentUserQueryHandler } from '../../../../modules/auth/application/handlers/queries/GetCurrentUserQueryHandler';

const router = Router();
const aiGateway = new GeminiProvider();
const aiHandler = new ProcessAiRequestHandler(aiGateway);
const aiController = new AiController(aiHandler);
const authMiddleware = new AuthenticationMiddleware(container.get("IJwtProvider"), container.get(GetCurrentUserQueryHandler));

router.post(
  '/process', 
  AiRateLimitMiddleware,
  authMiddleware.authenticate,
  AiAuditMiddleware, 
  AiAuthorizationMiddleware, 
  (req, res) => aiController.process(req, res)
);

export const AiRoutes = router;
