import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { container } from '@bootstrap/container/container';
import { VirusScannerService } from '../../../infrastructure/processing/VirusScannerService';
import { AuthenticationMiddleware } from '@shared/interfaces/http/middleware/AuthenticationMiddleware';

export interface MulterRequest extends Request {
  file?: any;
}

export const uploadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 uploads per window
  message: { success: false, error: 'Too many upload attempts. Please try again later.' },
});

export const validateFile = (req: Request, res: Response, next: NextFunction) => {
  const file = (req as MulterRequest).file;
  if (!file) {
    return next();
  }

  // Maximum file size check: 50MB
  const maxSizeBytes = 50 * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return res.status(400).json({ success: false, error: 'File size exceeds 50MB limit.' });
  }

  next();
};

export const virusScanHook = async (req: Request, res: Response, next: NextFunction) => {
  const file = (req as MulterRequest).file;
  if (!file || !file.buffer) return next();

  try {
    const scanner = container.get<VirusScannerService>(VirusScannerService);
    const isClean = await scanner.scan(file.buffer);

    if (!isClean) {
      return res.status(400).json({ success: false, error: 'Virus or malicious payload detected in file' });
    }
    next();
  } catch (error) {
    next();
  }
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authMiddleware = container.get(AuthenticationMiddleware);
  return authMiddleware.authenticate(req, res, next);
};
