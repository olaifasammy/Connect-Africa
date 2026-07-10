"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleAssignedEvent = void 0;
const DomainEvent_1 = require("../../../../shared/domain/DomainEvent");
class RoleAssignedEvent extends DomainEvent_1.DomainEvent {
    userId;
    roleId;
    constructor(userId, roleId) {
        super(userId);
        this.userId = userId;
        this.roleId = roleId;
    }
}
exports.RoleAssignedEvent = RoleAssignedEvent;
//# sourceMappingURL=RoleAssignedEvent.js.map