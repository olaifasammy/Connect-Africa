import { Request, Response, NextFunction } from 'express';
export declare const uploadRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const validateFile: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const virusScanHook: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
export declare const authorize: (roles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
