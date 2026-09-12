import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { UpdatePromptHandler } from '../../application/handlers/UpdatePromptHandler';

@provide(PromptController, true)
@injectable()
export class PromptController {
  constructor(private readonly updatePromptHandler: UpdatePromptHandler) {}

  async list(req: Request, res: Response) {
    // TODO: Implement list functionality
    res.json({ success: true, data: [] });
  }

  async create(req: Request, res: Response) {
    // TODO: Implement create functionality
    res.json({ success: true });
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const { content } = req.body;
    await this.updatePromptHandler.handle({ promptId: id, content });
    res.json({ success: true });
  }

  async delete(req: Request, res: Response) {
    // TODO: Implement delete functionality
    res.json({ success: true });
  }
}
