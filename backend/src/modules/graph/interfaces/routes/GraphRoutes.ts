import { Router } from 'express';
import { GraphController } from '../controllers/GraphController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/public';

export const graphRoutes = (graphController: GraphController, authMiddleware: AuthenticationMiddleware) => {
  const router = Router();
  
  router.use(authMiddleware.authenticate);

  router.post('/nodes', authorize(Permission.GRAPH_WRITE), (req, res) => graphController.createNode(req, res));
  router.post('/edges', authorize(Permission.GRAPH_WRITE), (req, res) => graphController.createEdge(req, res));
  router.get('/nodes/:id', authorize(Permission.GRAPH_READ), (req, res) => graphController.getNode(req, res));
  router.get('/search', authorize(Permission.GRAPH_READ), (req, res) => graphController.search(req, res));
  router.get('/path', authorize(Permission.GRAPH_READ), (req, res) => graphController.shortestPath(req, res));
  
  return router;
};
