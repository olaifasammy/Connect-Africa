import { Request, Response, NextFunction } from 'express';
import { CacheProvider } from '../../../../../shared/infrastructure/cache/CacheProvider';
export declare const cacheMetadata: (cacheProvider: CacheProvider) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
