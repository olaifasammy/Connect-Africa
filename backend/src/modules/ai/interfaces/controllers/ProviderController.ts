import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { GetProviderHealthHandler } from '../../application/handlers/GetProviderHealthHandler';
import { GetProviderHealthQuery } from '../../application/queries/GetProviderHealthQuery';

@provide(ProviderController, true)
@injectable()
export class ProviderController {
  constructor(private readonly healthHandler: GetProviderHealthHandler) {}

  async list(req: Request, res: Response) {
    // TODO: Implement list functionality
    res.json({ success: true, data: [] });
  }

  async create(req: Request, res: Response) {
    // TODO: Implement create functionality
    res.json({ success: true });
  }

  async getHealth(req: Request, res: Response) {
    const id = req.params.id as string;
    const query = new GetProviderHealthQuery(id);
    const result = await this.healthHandler.handle(query);
    res.json({ success: true, data: result });
  }
}
