"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
class AuthenticationService {
    passwordHasher;
    auditLogger;
    constructor(passwordHasher, auditLogger) {
        this.passwordHasher = passwordHasher;
        this.auditLogger = auditLogger;
    }
    async verifyPassword(user, password, ipAddress) {
        const isValid = await this.passwordHasher.compare(password, user.passwordHash.value);
        this.auditLogger.log({
            user: user.id.toString(),
            action: 'PASSWORD_VERIFICATION',
            resource: 'User',
            status: isValid ? 'SUCCESS' : 'FAILURE',
            ipAddress: ipAddress || 'unknown',
        });
        return isValid;
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map