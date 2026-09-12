import { Response } from 'express';
import { logger } from '@shared/logger/Logger';

export abstract class BaseController {
  protected handleError(res: Response, error: any): void {
    logger.error('Controller error', { error: error.message });
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
