"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlController = void 0;
class CrawlController {
    handler;
    constructor(handler) {
        this.handler = handler;
    }
    async start(req, res) {
        const { targetUrl } = req.body;
        await this.handler.handle({ targetUrl });
        res.json({ success: true });
    }
}
exports.CrawlController = CrawlController;
//# sourceMappingURL=CrawlController.js.map