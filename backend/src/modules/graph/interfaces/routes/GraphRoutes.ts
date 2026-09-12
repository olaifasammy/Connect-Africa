import { Router } from 'express';

import { GraphController } from '../controllers/GraphController';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';
import { authorize } from '@shared/interfaces/http/middleware/AuthorizationMiddleware';
import { Permission } from '@modules/auth/public';

export const graphRoutes = (
  graphController: GraphController,
  authMiddleware: AuthenticationMiddleware,
) => {
  const router = Router();

  router.use(
    authMiddleware.authenticate,
  );

  /*
   * Graph is a downstream projection of Entity
   * and Relationship.
   *
   * Entity owns node lifecycle.
   * Relationship owns semantic edge lifecycle.
   * Graph exposes read and traversal capabilities only.
   */

  router.get(
    '/nodes/:id',
    authorize(Permission.GRAPH_READ),
    (req, res) =>
      graphController.getNode(
        req,
        res,
      ),
  );

  router.get(
    '/metrics',
    authorize(Permission.GRAPH_READ),
    (req, res) =>
      graphController.getMetrics(
        req,
        res,
      ),
  );

  router.get(
    '/search',
    authorize(Permission.GRAPH_READ),
    (req, res) =>
      graphController.search(
        req,
        res,
      ),
  );

  router.get(
    '/path',
    authorize(Permission.GRAPH_READ),
    (req, res) =>
      graphController.shortestPath(
        req,
        res,
      ),
  );

  return router;
};