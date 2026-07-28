import { Router } from 'express';
import { AuditController } from '../controllers/AuditController';
import { container } from '../../../../bootstrap/container/container';

const router = Router();
const controller = container.get(AuditController);

router.post('/', (req, res) => controller.record(req, res));
router.get('/', (req, res) => controller.search(req, res));

export default router;
