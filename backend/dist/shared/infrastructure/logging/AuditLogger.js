"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogger = void 0;
const Logger_1 = require("../../logger/Logger");
class AuditLogger {
    static log(record) {
        Logger_1.logger.info('AUDIT_LOG', { ...record, timestamp: new Date().toISOString() });
    }
}
exports.AuditLogger = AuditLogger;
//# sourceMappingURL=AuditLogger.js.map