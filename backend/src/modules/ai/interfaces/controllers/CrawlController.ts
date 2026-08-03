import { Request, Response } from 'express';
import { StartCrawlerHandler } from '../../application/handlers/StartCrawlerHandler';

export class CrawlController {
  constructor(private readonly handler: StartCrawlerHandler) {}

  async start(req: Request, res: Response) {
    const { targetUrl } = req.body;
    await this.handler.handle({ targetUrl });
    res.json({ success: true });
  }
}
