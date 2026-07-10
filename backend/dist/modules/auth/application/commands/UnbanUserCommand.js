"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnbanUserCommand = void 0;
class UnbanUserCommand {
    adminUserId;
    userIdToUnban;
    ipAddress;
    constructor(adminUserId, userIdToUnban, ipAddress) {
        this.adminUserId = adminUserId;
        this.userIdToUnban = userIdToUnban;
        this.ipAddress = ipAddress;
    }
}
exports.UnbanUserCommand = UnbanUserCommand;
//# sourceMappingURL=UnbanUserCommand.js.map