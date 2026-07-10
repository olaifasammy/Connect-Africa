"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserCommand = void 0;
class UpdateUserCommand {
    adminUserId;
    userIdToUpdate;
    updates;
    ipAddress;
    constructor(adminUserId, userIdToUpdate, updates, ipAddress) {
        this.adminUserId = adminUserId;
        this.userIdToUpdate = userIdToUpdate;
        this.updates = updates;
        this.ipAddress = ipAddress;
    }
}
exports.UpdateUserCommand = UpdateUserCommand;
//# sourceMappingURL=UpdateUserCommand.js.map