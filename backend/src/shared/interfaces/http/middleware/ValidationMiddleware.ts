import { Request, Response, NextFunction } from 'express';

export abstract class ValidationMiddleware {
  abstract validate(req: Request, res: Response, next: NextFunction): void;
}
