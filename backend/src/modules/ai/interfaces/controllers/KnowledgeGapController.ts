import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { CreateKnowledgeGapHandler } from '../../application/handlers/CreateKnowledgeGapHandler';

@provide(KnowledgeGapController, true)
@injectable()
export class KnowledgeGapController {
  constructor(
    private readonly postgresProvider: PostgresProvider,
    private readonly handler: CreateKnowledgeGapHandler,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    const status = (req.query.status as string) || 'OPEN';
    const result = await this.postgresProvider.query(
      `SELECT id, topic, prompt, status, created_at FROM knowledge_gaps WHERE status = $1 ORDER BY created_at DESC LIMIT 100`,
      [status],
    );
    res.json({ success: true, data: result.rows });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { topic, prompt } = req.body;

    if (!topic || !prompt) {
      res.status(400).json({ success: false, error: 'Topic and prompt are required.' });
      return;
    }

    await this.handler.handle({ topic, prompt });
    res.status(201).json({ success: true, message: 'Knowledge gap recorded successfully.' });
  }
}
