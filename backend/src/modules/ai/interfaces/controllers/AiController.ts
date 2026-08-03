import { Request, Response } from 'express';
import { AIRequestDTOSchema } from '../dto/AIDTOs';
import { ProcessAiRequestHandler } from '../../application/handlers/ProcessAiRequestHandler';

export class AiController {
  constructor(private readonly aiHandler: ProcessAiRequestHandler) {}

  async process(req: Request, res: Response) {
    const validation = AIRequestDTOSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, errors: validation.error.issues });
    }

    const response = await this.aiHandler.handle({
      request: validation.data
    });
    
    res.json({ success: true, data: response });
  }
}
