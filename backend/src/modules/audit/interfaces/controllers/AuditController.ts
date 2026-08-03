import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { RecordAuditCommandHandler } from '../../application/handlers/RecordAuditCommandHandler';
import { SearchAuditQueryHandler } from '../../application/handlers/SearchAuditQueryHandler';
import { RecordAuditRequestSchema } from '../../application/dto/RecordAuditDto';

@injectable()
export class AuditController {
  constructor(
    @inject('RecordAuditCommandHandler') private readonly recordAuditCommandHandler: RecordAuditCommandHandler,
    @inject('SearchAuditQueryHandler') private readonly searchAuditQueryHandler: SearchAuditQueryHandler
  ) {}

  async record(req: Request, res: Response): Promise<void> {
    const data = RecordAuditRequestSchema.parse(req.body);
    await this.recordAuditCommandHandler.execute({ data });
    res.status(201).json({ success: true });
  }

  async search(req: Request, res: Response): Promise<void> {
    const { userId, resourceId } = req.query;
    const results = await this.searchAuditQueryHandler.execute({ 
      criteria: { userId: userId as string, resourceId: resourceId as string } 
    });
    res.json({ success: true, data: results });
  }
}
