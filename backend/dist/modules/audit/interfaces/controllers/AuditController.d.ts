import { Request, Response } from 'express';
import { RecordAuditCommandHandler } from '../../application/handlers/RecordAuditCommandHandler';
import { SearchAuditQueryHandler } from '../../application/handlers/SearchAuditQueryHandler';
export declare class AuditController {
    private readonly recordAuditCommandHandler;
    private readonly searchAuditQueryHandler;
    constructor(recordAuditCommandHandler: RecordAuditCommandHandler, searchAuditQueryHandler: SearchAuditQueryHandler);
    record(req: Request, res: Response): Promise<void>;
    search(req: Request, res: Response): Promise<void>;
}
