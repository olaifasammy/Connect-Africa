import { Request, Response, NextFunction } from 'express';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';

export const cacheMetadata = (cacheProvider: CacheProvider) => 
  async (req: Request, res: Response, next: NextFunction) => {
    const key = `media_meta_${req.params.id}`;
    const cached = await cacheProvider.get(key);
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    const originalJson = res.json;
    res.json = (body) => {
      cacheProvider.set(key, JSON.stringify(body), 3600);
      return originalJson.call(res, body);
    };
    next();
  };
