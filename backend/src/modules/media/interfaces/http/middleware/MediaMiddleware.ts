import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { VirusScannerService } from '@modules/media/infrastructure/processing/VirusScannerService';

// Define a type extension for Express Request with Multer
interface MulterRequest extends Request {
  file: Express.Multer.File;
}

export const uploadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many uploads from this IP, please try again after 15 minutes',
});

export const validateFile = (req: Request, res: Response, next: NextFunction) => {
  const file = (req as MulterRequest).file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });
  
  const buffer = file.buffer;
  const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
  const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
  const isGif = buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38;
  
  if (!isJpeg && !isPng && !isGif) {
      return res.status(400).json({ error: 'Invalid file signature' });
  }
  next();
};

export const virusScanHook = async (req: Request, res: Response, next: NextFunction) => {
  const file = (req as MulterRequest).file;
  if (!file) return next();
  
  const scanner = new VirusScannerService(); // TODO: Inject via Dependency Injection container
  const isClean = await scanner.scan(file.buffer);
  
  if (!isClean) {
    return res.status(400).json({ error: 'Virus detected in file' });
  }
  next();
};

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Logic to authenticate
  next();
};

export const authorize = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  // Logic to authorize based on roles
  next();
};
