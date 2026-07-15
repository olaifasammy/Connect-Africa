"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAIService = void 0;
class MediaAIService {
    aiProvider;
    constructor(aiProvider) {
        this.aiProvider = aiProvider;
    }
    async processMedia(media) {
        // TODO: Implement AI features (Captioning, OCR, Detection, Moderation, Tagging)
        // Dependency: Await implementation of the AI Bounded Context.
        await this.aiProvider.analyze(media.filePath);
    }
}
exports.MediaAIService = MediaAIService;
//# sourceMappingURL=MediaAIService.js.map