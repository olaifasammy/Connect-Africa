"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeletedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class UserDeletedEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.UserDeletedEvent = UserDeletedEvent;
//# sourceMappingURL=UserDeletedEvent.js.map