import { StartCrawlerCommand } from '../commands/StartCrawlerCommand';
import { WebCrawler } from '../services/WebCrawler';

export class StartCrawlerHandler {
  constructor(private readonly crawler: WebCrawler) {}

  async handle(command: StartCrawlerCommand): Promise<void> {
    await this.crawler.crawl(command.targetUrl);
  }
}
