import { Request, Response } from 'express';
import { CreateKnowledgeGapHandler } from '../../application/handlers/CreateKnowledgeGapHandler';
export declare class KnowledgeGapController {
    private readonly handler;
    constructor(handler: CreateKnowledgeGapHandler);
    create(req: Request, res: Response): Promise<void>;
}
