"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionEvaluator = void 0;
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
class PermissionEvaluator {
    static evaluate(role, requiredPermission, userId) {
        const hasPermission = role.hasPermission(requiredPermission);
        AuditLogger_1.AuditLogger.log({
            user: userId,
            action: 'PERMISSION_CHECK',
            resource: requiredPermission,
            status: hasPermission ? 'SUCCESS' : 'FAILURE'
        });
        if (!hasPermission) {
            throw new AuthErrors_1.AuthenticationError('Forbidden: Insufficient permissions');
        }
    }
}
exports.PermissionEvaluator = PermissionEvaluator;
//# sourceMappingURL=PermissionEvaluator.js.map