import { Router } from 'express';
import { container } from '@bootstrap/container/container';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { CacheProvider } from '@shared/infrastructure/cache/CacheProvider';

export const healthRoutes = () => {
  const router = Router();

  router.get('/', async (req, res) => {
    const postgresProvider = container.get(PostgresProvider);
    const cacheProvider = container.get(CacheProvider);

    const dbHealthy = await postgresProvider.healthCheck();
    const cacheHealthy = await cacheProvider.healthCheck();

    const status = dbHealthy && cacheHealthy ? 200 : 503;
    res.status(status).json({
      status: dbHealthy && cacheHealthy ? 'OK' : 'UNHEALTHY',
      dependencies: {
        database: dbHealthy ? 'OK' : 'UNHEALTHY',
        cache: cacheHealthy ? 'OK' : 'UNHEALTHY',
      },
    });
  });

  return router;
};
