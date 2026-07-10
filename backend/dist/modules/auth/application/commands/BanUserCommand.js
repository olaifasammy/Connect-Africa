"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanUserCommand = void 0;
class BanUserCommand {
    adminUserId;
    userIdToBan;
    ipAddress;
    constructor(adminUserId, userIdToBan, ipAddress) {
        this.adminUserId = adminUserId;
        this.userIdToBan = userIdToBan;
        this.ipAddress = ipAddress;
    }
}
exports.BanUserCommand = BanUserCommand;
//# sourceMappingURL=BanUserCommand.js.map