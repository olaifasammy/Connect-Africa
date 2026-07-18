import { StartCrawlerCommand } from '../commands/StartCrawlerCommand';
import { WebCrawler } from '../services/WebCrawler';
export declare class StartCrawlerHandler {
    private readonly crawler;
    constructor(crawler: WebCrawler);
    handle(command: StartCrawlerCommand): Promise<void>;
}
