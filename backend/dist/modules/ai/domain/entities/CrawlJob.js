"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlJob = void 0;
class CrawlJob {
    id;
    targetUrl;
    status;
    createdAt;
    constructor(id, targetUrl, status, createdAt) {
        this.id = id;
        this.targetUrl = targetUrl;
        this.status = status;
        this.createdAt = createdAt;
    }
}
exports.CrawlJob = CrawlJob;
//# sourceMappingURL=CrawlJob.js.map