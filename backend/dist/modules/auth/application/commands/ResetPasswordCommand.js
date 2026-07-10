"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordCommand = void 0;
class ResetPasswordCommand {
    email;
    newPassword;
    resetToken;
    ipAddress;
    constructor(email, newPassword, resetToken, ipAddress) {
        this.email = email;
        this.newPassword = newPassword;
        this.resetToken = resetToken;
        this.ipAddress = ipAddress;
    }
}
exports.ResetPasswordCommand = ResetPasswordCommand;
//# sourceMappingURL=ResetPasswordCommand.js.map