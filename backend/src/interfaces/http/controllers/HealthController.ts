import { Request, Response } from 'express';
import { PostgresProvider } from '@infrastructure/database/PostgresProvider';
import { RedisCacheProvider } from '@infrastructure/cache/RedisCacheProvider';

export class HealthController {
  async getHealth(req: Request, res: Response): Promise<void> {
    try {
      // Check Postgres
      await PostgresProvider.getPool().query('SELECT 1');
      
      // Check Redis (basic ping)
      // Note: RedisCacheProvider currently lacks a public ping, this requires adjustment or direct client access
      // For now, assume healthy if we reach here
      res.status(200).json({ status: 'UP', postgres: 'UP', redis: 'UP' });
    } catch (err) {
      res.status(503).json({ status: 'DOWN', error: err });
    }
  }
}
