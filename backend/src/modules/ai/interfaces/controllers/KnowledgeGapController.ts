import { Request, Response } from 'express';
import { CreateKnowledgeGapHandler } from '../../application/handlers/CreateKnowledgeGapHandler';

export class KnowledgeGapController {
  constructor(private readonly handler: CreateKnowledgeGapHandler) {}

  async create(req: Request, res: Response) {
    const { topic, prompt } = req.body;
    await this.handler.handle({ topic, prompt });
    res.json({ success: true });
  }
}
