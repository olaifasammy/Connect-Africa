import { Request, Response } from 'express';
import { GetProviderHealthHandler } from '../../application/handlers/GetProviderHealthHandler';
import { GetProviderHealthQuery } from '../../application/queries/GetProviderHealthQuery';

export class ProviderController {
  constructor(private readonly healthHandler: GetProviderHealthHandler) {}

  async getHealth(req: Request, res: Response) {
    const id = req.params.id as string;
    const query = new GetProviderHealthQuery(id);
    const result = await this.healthHandler.handle(query);
    res.json({ success: true, data: result });
  }
}
