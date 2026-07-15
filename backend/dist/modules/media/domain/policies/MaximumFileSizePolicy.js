"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaximumFileSizePolicy = void 0;
class MaximumFileSizePolicy {
    static isSatisfied(size, limit) {
        return size <= limit;
    }
}
exports.MaximumFileSizePolicy = MaximumFileSizePolicy;
//# sourceMappingURL=MaximumFileSizePolicy.js.map