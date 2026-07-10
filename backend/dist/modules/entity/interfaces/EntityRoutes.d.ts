import { Router } from 'express';
import { EntityController } from './EntityController';
import { AuthenticationMiddleware } from '../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
export declare const createEntityRoutes: (controller: EntityController, authMiddleware: AuthenticationMiddleware) => Router;
