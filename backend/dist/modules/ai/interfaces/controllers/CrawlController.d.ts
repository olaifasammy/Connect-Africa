import { Request, Response } from 'express';
import { StartCrawlerHandler } from '../../application/handlers/StartCrawlerHandler';
export declare class CrawlController {
    private readonly handler;
    constructor(handler: StartCrawlerHandler);
    start(req: Request, res: Response): Promise<void>;
}
