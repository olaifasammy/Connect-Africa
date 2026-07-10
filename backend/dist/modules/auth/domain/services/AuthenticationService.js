"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const AuditLogger_1 = require("../../infrastructure/AuditLogger");
class AuthenticationService {
    passwordHasher;
    constructor(passwordHasher) {
        this.passwordHasher = passwordHasher;
    }
    async verifyPassword(user, password, ipAddress) {
        const isValid = await this.passwordHasher.compare(password, user.passwordHash.value);
        AuditLogger_1.AuditLogger.log({
            user: user.id.toString(),
            action: 'PASSWORD_VERIFICATION',
            resource: 'User',
            status: isValid ? 'SUCCESS' : 'FAILURE',
            ipAddress,
        });
        return isValid;
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map