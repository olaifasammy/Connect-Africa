"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIRequest = void 0;
class AIRequest {
    id;
    prompt;
    providerId;
    timestamp;
    constructor(id, prompt, providerId, timestamp) {
        this.id = id;
        this.prompt = prompt;
        this.providerId = providerId;
        this.timestamp = timestamp;
    }
}
exports.AIRequest = AIRequest;
//# sourceMappingURL=AIRequest.js.map