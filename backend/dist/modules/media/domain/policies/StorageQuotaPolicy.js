"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageQuotaPolicy = void 0;
class StorageQuotaPolicy {
    static isWithinQuota(currentUsage, fileSize, quota) {
        return currentUsage + fileSize <= quota;
    }
}
exports.StorageQuotaPolicy = StorageQuotaPolicy;
//# sourceMappingURL=StorageQuotaPolicy.js.map