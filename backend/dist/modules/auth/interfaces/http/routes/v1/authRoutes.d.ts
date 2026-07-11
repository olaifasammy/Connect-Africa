import { AuthController } from '../../../../../auth/interfaces/AuthController';
import { AuthenticationMiddleware } from '../../../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
export declare const authRoutes: (authController: AuthController, authMiddleware: AuthenticationMiddleware) => import("express-serve-static-core").Router;
