"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaAIService = void 0;
class MediaAIService {
    aiGateway;
    constructor(aiGateway) {
        this.aiGateway = aiGateway;
    }
    async processMedia(media) {
        // Utilize AI Bounded Context via Gateway/Service
        const description = await this.aiGateway.requestExpansion(`Describe this media: ${media.filePath}`);
        console.log(`[MEDIA_AI] Processed media ${media.id}: ${description}`);
    }
}
exports.MediaAIService = MediaAIService;
//# sourceMappingURL=MediaAIService.js.map