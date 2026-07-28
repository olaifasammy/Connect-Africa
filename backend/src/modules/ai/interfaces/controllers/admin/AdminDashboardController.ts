import { Request, Response } from 'express';

export class AdminDashboardController {
  async getAiDashboard(req: Request, res: Response) { res.json({ dashboard: 'AI' }); }
  async getProviderDashboard(req: Request, res: Response) { res.json({ dashboard: 'Provider' }); }
  async getCrawlDashboard(req: Request, res: Response) { res.json({ dashboard: 'Crawl' }); }
  async getKnowledgeGapDashboard(req: Request, res: Response) { res.json({ dashboard: 'KnowledgeGap' }); }
  async getAnalyticsDashboard(req: Request, res: Response) { res.json({ dashboard: 'Analytics' }); }
}
