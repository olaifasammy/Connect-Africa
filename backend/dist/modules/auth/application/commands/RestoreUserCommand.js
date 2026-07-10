"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreUserCommand = void 0;
class RestoreUserCommand {
    adminUserId;
    userIdToRestore;
    ipAddress;
    constructor(adminUserId, userIdToRestore, ipAddress) {
        this.adminUserId = adminUserId;
        this.userIdToRestore = userIdToRestore;
        this.ipAddress = ipAddress;
    }
}
exports.RestoreUserCommand = RestoreUserCommand;
//# sourceMappingURL=RestoreUserCommand.js.map