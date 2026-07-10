"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class PasswordResetEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.PasswordResetEvent = PasswordResetEvent;
//# sourceMappingURL=PasswordResetEvent.js.map