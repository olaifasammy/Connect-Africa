"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPolicy = void 0;
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
class AdminPolicy {
    static isAdmin(role, userId) {
        const isAdmin = role.name === 'ADMIN';
        AuditLogger_1.AuditLogger.log({
            user: userId,
            action: 'ADMIN_CHECK',
            resource: 'SYSTEM',
            status: isAdmin ? 'SUCCESS' : 'FAILURE'
        });
        if (!isAdmin) {
            throw new AuthErrors_1.AuthenticationError('Forbidden: Admin access required');
        }
    }
}
exports.AdminPolicy = AdminPolicy;
//# sourceMappingURL=AdminPolicy.js.map