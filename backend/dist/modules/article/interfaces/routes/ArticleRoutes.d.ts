import { Router } from 'express';
import { ArticleController } from '../controllers/ArticleController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
export declare function createArticleRoutes(controller: ArticleController, authMiddleware: AuthenticationMiddleware): Router;
