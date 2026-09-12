import { provide } from "inversify-binding-decorators";
import { injectable } from "inversify";
import { StartCrawlerCommand } from '../commands/StartCrawlerCommand';
import { WebCrawler } from '../services/WebCrawler';

@provide(StartCrawlerHandler, true)
@injectable()
export class StartCrawlerHandler {
  constructor(private readonly crawler: WebCrawler) {}

  async handle(command: StartCrawlerCommand): Promise<void> {
    await this.crawler.crawl(command.targetUrl);
  }
}
