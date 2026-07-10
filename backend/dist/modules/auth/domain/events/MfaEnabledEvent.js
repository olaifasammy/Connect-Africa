"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfaEnabledEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class MfaEnabledEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.MfaEnabledEvent = MfaEnabledEvent;
//# sourceMappingURL=MfaEnabledEvent.js.map