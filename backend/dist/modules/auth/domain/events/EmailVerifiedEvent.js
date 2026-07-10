"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailVerifiedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class EmailVerifiedEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.EmailVerifiedEvent = EmailVerifiedEvent;
//# sourceMappingURL=EmailVerifiedEvent.js.map