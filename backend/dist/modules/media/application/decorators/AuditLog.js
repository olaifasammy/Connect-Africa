"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = AuditLog;
const AuditLogger_1 = require("../../../../shared/infrastructure/logging/AuditLogger");
function AuditLog(action) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            try {
                const result = await originalMethod.apply(this, args);
                AuditLogger_1.AuditLogger.log({
                    user: 'system',
                    action: action,
                    resource: 'unknown',
                    status: 'SUCCESS',
                });
                return result;
            }
            catch (error) {
                AuditLogger_1.AuditLogger.log({
                    user: 'system',
                    action: action,
                    resource: 'unknown',
                    status: 'FAILURE',
                });
                throw error;
            }
        };
        return descriptor;
    };
}
//# sourceMappingURL=AuditLog.js.map