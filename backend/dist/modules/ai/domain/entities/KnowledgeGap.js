"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnowledgeGap = void 0;
class KnowledgeGap {
    id;
    topic;
    requestedPrompt;
    status;
    createdAt;
    constructor(id, topic, requestedPrompt, status, createdAt) {
        this.id = id;
        this.topic = topic;
        this.requestedPrompt = requestedPrompt;
        this.status = status;
        this.createdAt = createdAt;
    }
}
exports.KnowledgeGap = KnowledgeGap;
//# sourceMappingURL=KnowledgeGap.js.map