"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryPolicy = void 0;
class RetryPolicy {
    maxRetries;
    constructor(maxRetries = 3) {
        this.maxRetries = maxRetries;
    }
}
exports.RetryPolicy = RetryPolicy;
//# sourceMappingURL=RetryPolicy.js.map