"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetMfaCommand = void 0;
class ResetMfaCommand {
    adminUserId;
    userId;
    ipAddress;
    constructor(adminUserId, userId, ipAddress) {
        this.adminUserId = adminUserId;
        this.userId = userId;
        this.ipAddress = ipAddress;
    }
}
exports.ResetMfaCommand = ResetMfaCommand;
//# sourceMappingURL=ResetMfaCommand.js.map