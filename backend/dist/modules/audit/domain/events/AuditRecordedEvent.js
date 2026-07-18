"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditRecordedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class AuditRecordedEvent extends DomainEvent_1.DomainEvent {
    auditEntry;
    constructor(auditEntry) {
        super(auditEntry.id);
        this.auditEntry = auditEntry;
    }
}
exports.AuditRecordedEvent = AuditRecordedEvent;
//# sourceMappingURL=AuditRecordedEvent.js.map