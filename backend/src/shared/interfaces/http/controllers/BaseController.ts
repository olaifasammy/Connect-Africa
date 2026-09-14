import { Response } from 'express';
import { logger } from '@shared/logger/Logger';
import { BaseError } from '@shared/errors/BaseError';

export abstract class BaseController {
  protected handleError(res: Response, error: any): void {
    logger.error('Controller error', { error: error.message, stack: error.stack });
    
    if (error instanceof BaseError || error.name === 'AuthenticationError' || error.message === 'Invalid credentials.') {
      res.status(401).json({ success: false, error: error.message });
      return;
    }

    if (error.name === 'ValidationError' || error.name === 'ZodError') {
      res.status(400).json({ success: false, error: error.message });
      return;
    }

    res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
  }
}
