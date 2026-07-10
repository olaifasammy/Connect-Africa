"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuspendUserCommand = void 0;
class SuspendUserCommand {
    adminUserId;
    userIdToSuspend;
    ipAddress;
    constructor(adminUserId, userIdToSuspend, ipAddress) {
        this.adminUserId = adminUserId;
        this.userIdToSuspend = userIdToSuspend;
        this.ipAddress = ipAddress;
    }
}
exports.SuspendUserCommand = SuspendUserCommand;
//# sourceMappingURL=SuspendUserCommand.js.map