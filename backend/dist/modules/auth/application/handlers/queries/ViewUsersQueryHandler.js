"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewUsersQueryHandler = void 0;
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
class ViewUsersQueryHandler {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(query) {
        try {
            // Policy enforcement would be here
            const users = await this.userRepository.findAll(); // Assume this exists
            AuditLogger_1.AuditLogger.log({
                user: query.adminUserId,
                action: 'VIEW_USERS',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: query.ipAddress
            });
            return users;
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: query.adminUserId,
                action: 'VIEW_USERS',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: query.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to view users');
        }
    }
}
exports.ViewUsersQueryHandler = ViewUsersQueryHandler;
//# sourceMappingURL=ViewUsersQueryHandler.js.map