import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PostgresProvider } from '@shared/infrastructure/database/PostgresProvider';
import { UpdatePromptHandler } from '../../application/handlers/UpdatePromptHandler';

@provide(PromptController, true)
@injectable()
export class PromptController {
  constructor(
    private readonly postgresProvider: PostgresProvider,
    private readonly updatePromptHandler: UpdatePromptHandler,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    const result = await this.postgresProvider.query(
      `SELECT id, name, content, version FROM ai_prompts ORDER BY name ASC, version DESC`,
    );
    res.json({ success: true, data: result.rows });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { name, content } = req.body;

    if (!name || !content) {
      res.status(400).json({ success: false, error: 'Name and content are required.' });
      return;
    }

    const id = uuidv4();
    await this.postgresProvider.query(
      `INSERT INTO ai_prompts (id, name, content, version) VALUES ($1, $2, $3, 1)`,
      [id, name, content],
    );

    res.status(201).json({ success: true, data: { id, name, content, version: 1 } });
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    const { content } = req.body;
    await this.updatePromptHandler.handle({ promptId: id, content });
    res.json({ success: true });
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string;
    await this.postgresProvider.query(`DELETE FROM ai_prompts WHERE id = $1`, [id]);
    res.json({ success: true, message: `Prompt ${id} deleted.` });
  }
}
