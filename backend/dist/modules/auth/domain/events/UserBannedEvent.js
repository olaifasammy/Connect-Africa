"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBannedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class UserBannedEvent extends DomainEvent_1.DomainEvent {
    userId;
    constructor(userId) {
        super(userId);
        this.userId = userId;
    }
}
exports.UserBannedEvent = UserBannedEvent;
//# sourceMappingURL=UserBannedEvent.js.map