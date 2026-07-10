import { Request, Response, NextFunction } from 'express';
export declare abstract class ValidationMiddleware {
    abstract validate(req: Request, res: Response, next: NextFunction): void;
}
