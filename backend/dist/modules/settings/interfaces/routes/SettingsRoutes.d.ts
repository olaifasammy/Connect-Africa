import { Router } from 'express';
import { SettingsController } from '../controllers/SettingsController';
import { AuthenticationMiddleware } from '../../../../shared/interfaces/http/middleware/AuthenticationMiddleware';
export declare const settingsRoutes: (controller: SettingsController, authMiddleware: AuthenticationMiddleware) => Router;
