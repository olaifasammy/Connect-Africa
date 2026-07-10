"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountActivatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class AccountActivatedEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.AccountActivatedEvent = AccountActivatedEvent;
//# sourceMappingURL=AccountActivatedEvent.js.map