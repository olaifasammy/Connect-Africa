"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionRevokedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class SessionRevokedEvent extends DomainEvent_1.DomainEvent {
    userId;
    sessionId;
    constructor(userId, sessionId) {
        super(userId);
        this.userId = userId;
        this.sessionId = sessionId;
    }
}
exports.SessionRevokedEvent = SessionRevokedEvent;
//# sourceMappingURL=SessionRevokedEvent.js.map