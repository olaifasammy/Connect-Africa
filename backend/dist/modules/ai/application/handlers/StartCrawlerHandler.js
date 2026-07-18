"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartCrawlerHandler = void 0;
class StartCrawlerHandler {
    crawler;
    constructor(crawler) {
        this.crawler = crawler;
    }
    async handle(command) {
        await this.crawler.crawl(command.targetUrl);
    }
}
exports.StartCrawlerHandler = StartCrawlerHandler;
//# sourceMappingURL=StartCrawlerHandler.js.map