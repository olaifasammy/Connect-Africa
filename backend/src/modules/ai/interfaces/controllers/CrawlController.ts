import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Request, Response } from 'express';
import { StartCrawlerHandler } from '../../application/handlers/StartCrawlerHandler';

@provide(CrawlController, true)
@injectable()
export class CrawlController {
  constructor(private readonly handler: StartCrawlerHandler) {}

  async start(req: Request, res: Response) {
    const { targetUrl } = req.body;
    await this.handler.handle({ targetUrl });
    res.json({ success: true });
  }
}
