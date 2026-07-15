import { Router } from 'express';
import { MediaController } from './MediaController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
export declare function createMediaRoutes(controller: MediaController, authMiddleware: AuthenticationMiddleware): Router;
