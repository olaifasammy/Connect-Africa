"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlScheduler = void 0;
const Logger_1 = require("../../../../shared/logger/Logger");
class CrawlScheduler {
    schedule(targetUrl, interval) {
        Logger_1.logger.info(`[CRAWL] Scheduling crawl for ${targetUrl} every ${interval}ms`);
    }
}
exports.CrawlScheduler = CrawlScheduler;
//# sourceMappingURL=CrawlScheduler.js.map