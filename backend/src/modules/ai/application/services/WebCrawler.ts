export class WebCrawler {
  async crawl(url: string): Promise<string> {
    return `Content from ${url}`;
  }
}
