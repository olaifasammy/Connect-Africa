"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailCommand = void 0;
class VerifyEmailCommand {
    userId;
    token;
    ipAddress;
    constructor(userId, token, ipAddress) {
        this.userId = userId;
        this.token = token;
        this.ipAddress = ipAddress;
    }
}
exports.VerifyEmailCommand = VerifyEmailCommand;
//# sourceMappingURL=VerifyEmailCommand.js.map