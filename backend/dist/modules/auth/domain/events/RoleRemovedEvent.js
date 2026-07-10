"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRemovedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class RoleRemovedEvent extends DomainEvent_1.DomainEvent {
    userId;
    roleId;
    constructor(userId, roleId) {
        super(userId);
        this.userId = userId;
        this.roleId = roleId;
    }
}
exports.RoleRemovedEvent = RoleRemovedEvent;
//# sourceMappingURL=RoleRemovedEvent.js.map