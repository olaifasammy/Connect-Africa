import { Router } from 'express';
import { AuditController } from '../controllers/AuditController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '../../../../shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '../../../auth/domain/policies/rbac/Permissions';

export const createAuditRoutes = (controller: AuditController, authMiddleware: AuthenticationMiddleware): Router => {
  const router = Router();
  router.use(authMiddleware.authenticate);

  router.post('/', authorize(Permission.AUDIT_WRITE), (req, res) => controller.record(req, res));
  router.get('/', authorize(Permission.AUDIT_READ), (req, res) => controller.search(req, res));

  return router;
};
