"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersQueryHandler = void 0;
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
class ListUsersQueryHandler {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(query) {
        try {
            const users = await this.userRepository.findAll();
            AuditLogger_1.AuditLogger.log({
                user: query.adminUserId,
                action: 'LIST_USERS',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: query.ipAddress
            });
            return users;
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: query.adminUserId,
                action: 'LIST_USERS',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: query.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to list users');
        }
    }
}
exports.ListUsersQueryHandler = ListUsersQueryHandler;
//# sourceMappingURL=ListUsersQueryHandler.js.map