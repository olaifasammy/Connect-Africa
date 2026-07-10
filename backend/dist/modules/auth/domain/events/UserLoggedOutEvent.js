"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoggedOutEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class UserLoggedOutEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.UserLoggedOutEvent = UserLoggedOutEvent;
//# sourceMappingURL=UserLoggedOutEvent.js.map