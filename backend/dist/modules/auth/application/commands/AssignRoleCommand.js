"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignRoleCommand = void 0;
class AssignRoleCommand {
    adminUserId;
    userId;
    role;
    ipAddress;
    constructor(adminUserId, userId, role, ipAddress) {
        this.adminUserId = adminUserId;
        this.userId = userId;
        this.role = role;
        this.ipAddress = ipAddress;
    }
}
exports.AssignRoleCommand = AssignRoleCommand;
//# sourceMappingURL=AssignRoleCommand.js.map