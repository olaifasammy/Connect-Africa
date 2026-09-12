import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';

@provide(AdminDashboardController, true)
@injectable()
export class AdminDashboardController {
  async getAiDashboard(req: Request, res: Response) { res.json({ dashboard: 'AI' }); }
  async getProviderDashboard(req: Request, res: Response) { res.json({ dashboard: 'Provider' }); }
  async getCrawlDashboard(req: Request, res: Response) { res.json({ dashboard: 'Crawl' }); }
  async getKnowledgeGapDashboard(req: Request, res: Response) { res.json({ dashboard: 'KnowledgeGap' }); }
  async getAnalyticsDashboard(req: Request, res: Response) { res.json({ dashboard: 'Analytics' }); }
}
