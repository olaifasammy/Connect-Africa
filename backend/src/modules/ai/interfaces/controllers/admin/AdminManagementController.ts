import { Request, Response } from 'express';

export class AdminManagementController {
  async createPrompt(req: Request, res: Response) { res.json({ success: true }); }
  async updatePrompt(req: Request, res: Response) { res.json({ success: true }); }
  async rollbackPrompt(req: Request, res: Response) { res.json({ success: true }); }
  async previewPrompt(req: Request, res: Response) { res.json({ success: true }); }
  async addProvider(req: Request, res: Response) { res.json({ success: true }); }
  async removeProvider(req: Request, res: Response) { res.json({ success: true }); }
  async addCrawlTarget(req: Request, res: Response) { res.json({ success: true }); }
  async removeCrawlTarget(req: Request, res: Response) { res.json({ success: true }); }
}
