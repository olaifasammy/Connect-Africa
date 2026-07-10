"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUsersQueryHandler = void 0;
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
class SearchUsersQueryHandler {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(query) {
        try {
            const users = await this.userRepository.search(query.searchTerm); // Assume search exists
            AuditLogger_1.AuditLogger.log({
                user: query.adminUserId,
                action: 'SEARCH_USERS',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: query.ipAddress
            });
            return users;
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: query.adminUserId,
                action: 'SEARCH_USERS',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: query.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to search users');
        }
    }
}
exports.SearchUsersQueryHandler = SearchUsersQueryHandler;
//# sourceMappingURL=SearchUsersQueryHandler.js.map