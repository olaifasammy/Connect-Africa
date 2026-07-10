"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class UserUpdatedEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.UserUpdatedEvent = UserUpdatedEvent;
//# sourceMappingURL=UserUpdatedEvent.js.map