import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { CreateKnowledgeGapHandler } from '../../application/handlers/CreateKnowledgeGapHandler';

@provide(KnowledgeGapController, true)
@injectable()
export class KnowledgeGapController {
  constructor(private readonly handler: CreateKnowledgeGapHandler) {}

  async list(req: Request, res: Response) {
    // TODO: Implement list functionality - requires a dedicated ListKnowledgeGapsQueryHandler
    res.json({ success: true, data: [] });
  }

  async create(req: Request, res: Response) {
    const { topic, prompt } = req.body;
    await this.handler.handle({ topic, prompt });
    res.json({ success: true });
  }
}
