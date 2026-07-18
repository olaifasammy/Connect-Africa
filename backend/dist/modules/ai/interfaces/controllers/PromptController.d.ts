import { Request, Response } from 'express';
import { UpdatePromptHandler } from '../../application/handlers/UpdatePromptHandler';
export declare class PromptController {
    private readonly updatePromptHandler;
    constructor(updatePromptHandler: UpdatePromptHandler);
    update(req: Request, res: Response): Promise<void>;
}
