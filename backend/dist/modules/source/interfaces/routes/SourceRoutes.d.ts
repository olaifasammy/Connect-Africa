import { Router } from 'express';
import { SourceController } from '../controllers/SourceController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
export declare function createSourceRoutes(controller: SourceController, authMiddleware: AuthenticationMiddleware): Router;
