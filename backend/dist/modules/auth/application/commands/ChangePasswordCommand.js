"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordCommand = void 0;
class ChangePasswordCommand {
    userId;
    currentPassword;
    newPassword;
    ipAddress;
    constructor(userId, currentPassword, newPassword, ipAddress) {
        this.userId = userId;
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.ipAddress = ipAddress;
    }
}
exports.ChangePasswordCommand = ChangePasswordCommand;
//# sourceMappingURL=ChangePasswordCommand.js.map