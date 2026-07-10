import { Router } from 'express';
import { GraphController } from '../controllers/GraphController';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/domain/policies/rbac/Permissions';

export const graphRoutes = (graphController: GraphController) => {
  const router = Router();
  router.get('/path', authorize(Permission.GRAPH_READ), (req, res) => graphController.getPath(req, res));
  return router;
};
