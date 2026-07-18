import { Request, Response } from 'express';
export declare class AdminDashboardController {
    getAiDashboard(req: Request, res: Response): Promise<void>;
    getProviderDashboard(req: Request, res: Response): Promise<void>;
    getCrawlDashboard(req: Request, res: Response): Promise<void>;
    getKnowledgeGapDashboard(req: Request, res: Response): Promise<void>;
    getAnalyticsDashboard(req: Request, res: Response): Promise<void>;
}
