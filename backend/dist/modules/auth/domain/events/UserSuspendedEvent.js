"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSuspendedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class UserSuspendedEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.UserSuspendedEvent = UserSuspendedEvent;
//# sourceMappingURL=UserSuspendedEvent.js.map