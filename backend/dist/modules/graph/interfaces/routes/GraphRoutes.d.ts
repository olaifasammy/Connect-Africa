import { GraphController } from '../controllers/GraphController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
export declare const graphRoutes: (graphController: GraphController, authMiddleware: AuthenticationMiddleware) => import("express-serve-static-core").Router;
