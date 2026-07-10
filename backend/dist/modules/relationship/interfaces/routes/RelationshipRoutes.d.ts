import { Router } from 'express';
import { RelationshipController } from '../controllers/RelationshipController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
export declare const relationshipRoutes: (controller: RelationshipController, authMiddleware: AuthenticationMiddleware) => Router;
