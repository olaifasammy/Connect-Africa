"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarUpdatedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class AvatarUpdatedEvent extends DomainEvent_1.DomainEvent {
    userId;
    avatarUrl;
    constructor(userId, avatarUrl) {
        super(userId);
        this.userId = userId;
        this.avatarUrl = avatarUrl;
    }
}
exports.AvatarUpdatedEvent = AvatarUpdatedEvent;
//# sourceMappingURL=AvatarUpdatedEvent.js.map