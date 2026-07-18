"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditRetentionPolicy = void 0;
class AuditRetentionPolicy {
    static isExpired(audit) {
        const retentionPeriodDays = 90;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() - retentionPeriodDays);
        return audit.timestamp.getProps().value < expirationDate;
    }
}
exports.AuditRetentionPolicy = AuditRetentionPolicy;
//# sourceMappingURL=AuditRetentionPolicy.js.map