"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChangedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class PasswordChangedEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.PasswordChangedEvent = PasswordChangedEvent;
//# sourceMappingURL=PasswordChangedEvent.js.map