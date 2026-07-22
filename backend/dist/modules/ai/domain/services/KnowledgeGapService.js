"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeGapService = void 0;
const Logger_1 = require("../../../../shared/logger/Logger");
class KnowledgeGapService {
    async recordGap(topic, prompt) {
        // Logic to record a knowledge gap in the system
        Logger_1.logger.info(`[KNOWLEDGE_GAP] Topic: ${topic}, Prompt: ${prompt}`);
    }
}
exports.KnowledgeGapService = KnowledgeGapService;
//# sourceMappingURL=KnowledgeGapService.js.map