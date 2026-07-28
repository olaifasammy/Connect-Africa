import { Request, Response } from 'express';
import { UpdatePromptHandler } from '../../application/handlers/UpdatePromptHandler';

export class PromptController {
  constructor(private readonly updatePromptHandler: UpdatePromptHandler) {}

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const { content } = req.body;
    await this.updatePromptHandler.handle({ promptId: id, content });
    res.json({ success: true });
  }
}
