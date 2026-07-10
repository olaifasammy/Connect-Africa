"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class UserCreatedEvent extends DomainEvent_1.DomainEvent {
    userId;
    email;
    constructor(userId, email) {
        super(userId);
        this.userId = userId;
        this.email = email;
    }
}
exports.UserCreatedEvent = UserCreatedEvent;
//# sourceMappingURL=UserCreatedEvent.js.map