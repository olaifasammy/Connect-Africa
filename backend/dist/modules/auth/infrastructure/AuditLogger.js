"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogger = void 0;
const AuditLogger_1 = require("../../../shared/infrastructure/logging/AuditLogger");
class AuditLogger {
    static instance = new AuditLogger();
    log(data) {
        AuditLogger_1.AuditLogger.log({
            ...data,
            ipAddress: data.ipAddress || 'unknown'
        });
    }
    static log(data) {
        AuditLogger.instance.log(data);
    }
}
exports.AuditLogger = AuditLogger;
//# sourceMappingURL=AuditLogger.js.map