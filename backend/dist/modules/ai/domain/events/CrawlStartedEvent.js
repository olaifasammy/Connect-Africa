"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlStartedEvent = void 0;
class CrawlStartedEvent {
    jobId;
    targetUrl;
    timestamp;
    constructor(jobId, targetUrl, timestamp) {
        this.jobId = jobId;
        this.targetUrl = targetUrl;
        this.timestamp = timestamp;
    }
}
exports.CrawlStartedEvent = CrawlStartedEvent;
//# sourceMappingURL=CrawlStartedEvent.js.map