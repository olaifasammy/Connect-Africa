import { Request, Response } from 'express';
export declare class AdminManagementController {
    createPrompt(req: Request, res: Response): Promise<void>;
    updatePrompt(req: Request, res: Response): Promise<void>;
    rollbackPrompt(req: Request, res: Response): Promise<void>;
    previewPrompt(req: Request, res: Response): Promise<void>;
    addProvider(req: Request, res: Response): Promise<void>;
    removeProvider(req: Request, res: Response): Promise<void>;
    addCrawlTarget(req: Request, res: Response): Promise<void>;
    removeCrawlTarget(req: Request, res: Response): Promise<void>;
}
