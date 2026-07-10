import { Request, Response } from 'express';
import { GetGraphPathHandler } from '../../application/handlers/GetGraphPathHandler';
import { GetGraphPathQuery } from '../../application/queries/GetGraphPathQuery';
import { GetGraphPathRequestDto, GetGraphPathRequestSchema } from '../../application/dto/GetGraphPathRequestDto';
import { GetGraphPathResponseDto } from '../../application/dto/GetGraphPathResponseDto';

export class GraphController {
  constructor(private readonly getPathHandler: GetGraphPathHandler) {}

  async getPath(req: Request, res: Response) {
    const validation = GetGraphPathRequestSchema.safeParse(req.query);
    if (!validation.success) {
      return res.status(400).json({ success: false, errors: validation.error.issues });
    }

    const { start, end } = validation.data;
    const userId = (req as any).user?.id || 'anonymous';
    const ipAddress = req.ip || 'unknown';
    const path = await this.getPathHandler.handle(new GetGraphPathQuery(start, end), userId, ipAddress);
    
    const response: GetGraphPathResponseDto = { path };
    res.status(200).json({ success: true, data: response });
  }
}
