"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchAssistantService = void 0;
class ResearchAssistantService {
    aiGateway;
    constructor(aiGateway) {
        this.aiGateway = aiGateway;
    }
    async research(topic) {
        const response = await this.aiGateway.processRequest({
            prompt: `Research the topic: ${topic}`
        });
        return response.content;
    }
}
exports.ResearchAssistantService = ResearchAssistantService;
//# sourceMappingURL=ResearchAssistantService.js.map