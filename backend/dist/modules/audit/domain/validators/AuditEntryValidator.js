"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditEntryValidator = void 0;
class AuditEntryValidator {
    static validate(audit) {
        if (!audit.action || audit.action.trim() === '') {
            throw new Error('Audit action is required');
        }
    }
}
exports.AuditEntryValidator = AuditEntryValidator;
//# sourceMappingURL=AuditEntryValidator.js.map