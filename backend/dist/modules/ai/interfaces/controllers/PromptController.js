"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptController = void 0;
class PromptController {
    updatePromptHandler;
    constructor(updatePromptHandler) {
        this.updatePromptHandler = updatePromptHandler;
    }
    async update(req, res) {
        const id = req.params.id;
        const { content } = req.body;
        await this.updatePromptHandler.handle({ promptId: id, content });
        res.json({ success: true });
    }
}
exports.PromptController = PromptController;
//# sourceMappingURL=PromptController.js.map