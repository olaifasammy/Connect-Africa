"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailChangedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class EmailChangedEvent extends DomainEvent_1.DomainEvent {
    userId;
    newEmail;
    constructor(userId, newEmail) {
        super(userId);
        this.userId = userId;
        this.newEmail = newEmail;
    }
}
exports.EmailChangedEvent = EmailChangedEvent;
//# sourceMappingURL=EmailChangedEvent.js.map