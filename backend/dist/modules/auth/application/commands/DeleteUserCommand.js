"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserCommand = void 0;
class DeleteUserCommand {
    adminUserId;
    userIdToDelete;
    ipAddress;
    constructor(adminUserId, userIdToDelete, ipAddress) {
        this.adminUserId = adminUserId;
        this.userIdToDelete = userIdToDelete;
        this.ipAddress = ipAddress;
    }
}
exports.DeleteUserCommand = DeleteUserCommand;
//# sourceMappingURL=DeleteUserCommand.js.map