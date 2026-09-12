import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';

@provide(WebCrawler, true)
@injectable()
export class WebCrawler {
  async crawl(url: string): Promise<string> {
    return `Content from ${url}`;
  }
}
