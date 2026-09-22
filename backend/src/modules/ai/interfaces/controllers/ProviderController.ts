import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { GetProviderHealthHandler } from '../../application/handlers/GetProviderHealthHandler';
import { GetProviderHealthQuery } from '../../application/queries/GetProviderHealthQuery';

@provide(ProviderController, true)
@injectable()
export class ProviderController {
  constructor(
    private readonly postgresProvider: PostgresProvider,
    private readonly healthHandler: GetProviderHealthHandler,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    const result = await this.postgresProvider.query(
      `SELECT id, name, is_enabled, priority FROM providers ORDER BY priority DESC, name ASC`,
    );
    res.json({ success: true, data: result.rows });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { name, isEnabled = true, priority = 0 } = req.body;

    if (!name) {
      res.status(400).json({ success: false, error: 'Provider name is required.' });
      return;
    }

    const id = uuidv4();
    await this.postgresProvider.query(
      `INSERT INTO providers (id, name, is_enabled, priority) VALUES ($1, $2, $3, $4)`,
      [id, name, isEnabled, priority],
    );

    res.status(201).json({ success: true, data: { id, name, isEnabled, priority } });
  }

  async getHealth(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const query = new GetProviderHealthQuery(id);
    const result = await this.healthHandler.handle(query);
    res.json({ success: true, data: result });
  }
}
