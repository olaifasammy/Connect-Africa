"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisteredEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class UserRegisteredEvent extends DomainEvent_1.DomainEvent {
    userId;
    email;
    constructor(userId, email) {
        super(userId);
        this.userId = userId;
        this.email = email;
    }
}
exports.UserRegisteredEvent = UserRegisteredEvent;
//# sourceMappingURL=UserRegisteredEvent.js.map