"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogRequestedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class AuditLogRequestedEvent extends DomainEvent_1.DomainEvent {
    payload;
    constructor(payload) {
        super(new UniqueEntityId_1.UniqueEntityId(payload.actorId));
        this.payload = payload;
    }
}
exports.AuditLogRequestedEvent = AuditLogRequestedEvent;
//# sourceMappingURL=AuditLogRequestedEvent.js.map