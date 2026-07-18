"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeGapController = void 0;
class KnowledgeGapController {
    handler;
    constructor(handler) {
        this.handler = handler;
    }
    async create(req, res) {
        const { topic, prompt } = req.body;
        await this.handler.handle({ topic, prompt });
        res.json({ success: true });
    }
}
exports.KnowledgeGapController = KnowledgeGapController;
//# sourceMappingURL=KnowledgeGapController.js.map