"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveRoleCommand = void 0;
class RemoveRoleCommand {
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
exports.RemoveRoleCommand = RemoveRoleCommand;
//# sourceMappingURL=RemoveRoleCommand.js.map