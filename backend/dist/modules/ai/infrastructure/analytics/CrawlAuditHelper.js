"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlAuditHelper = void 0;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
class CrawlAuditHelper {
    static logCrawl(targetUrl, action) {
        AuditLogger_1.AuditLogger.log({
            user: 'admin',
            action: `CRAWL_${action}`,
            resource: `Crawl:${targetUrl}`,
            status: 'SUCCESS'
        });
    }
}
exports.CrawlAuditHelper = CrawlAuditHelper;
//# sourceMappingURL=CrawlAuditHelper.js.map