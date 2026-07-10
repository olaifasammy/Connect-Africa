"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRestoredEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class UserRestoredEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.UserRestoredEvent = UserRestoredEvent;
//# sourceMappingURL=UserRestoredEvent.js.map