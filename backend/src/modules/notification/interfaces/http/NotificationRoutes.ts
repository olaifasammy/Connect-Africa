import { Router } from 'express';
import { NotificationController } from './NotificationController';

const router = Router();
const controller = new NotificationController();

router.post('/', controller.send);

export { router as NotificationRoutes };
