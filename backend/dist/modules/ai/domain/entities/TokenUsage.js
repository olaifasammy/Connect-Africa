"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUsage = void 0;
class TokenUsage {
    id;
    providerId;
    tokensUsed;
    timestamp;
    constructor(id, providerId, tokensUsed, timestamp) {
        this.id = id;
        this.providerId = providerId;
        this.tokensUsed = tokensUsed;
        this.timestamp = timestamp;
    }
}
exports.TokenUsage = TokenUsage;
//# sourceMappingURL=TokenUsage.js.map