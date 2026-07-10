"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoggedInEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class UserLoggedInEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.UserLoggedInEvent = UserLoggedInEvent;
//# sourceMappingURL=UserLoggedInEvent.js.map