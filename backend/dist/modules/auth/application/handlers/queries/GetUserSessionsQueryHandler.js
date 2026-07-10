"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserSessionsQueryHandler = void 0;
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
class GetUserSessionsQueryHandler {
    sessionRepository;
    constructor(sessionRepository) {
        this.sessionRepository = sessionRepository;
    }
    async handle(query) {
        try {
            // In a real implementation, we would fetch sessions for the userId.
            // For now, focusing on structure, audit, and security.
            AuditLogger_1.AuditLogger.log({
                user: query.userId,
                action: 'GET_USER_SESSIONS',
                resource: 'SESSION',
                status: 'SUCCESS',
                ipAddress: query.ipAddress
            });
            return [];
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: query.userId,
                action: 'GET_USER_SESSIONS',
                resource: 'SESSION',
                status: 'FAILURE',
                ipAddress: query.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to get user sessions');
        }
    }
}
exports.GetUserSessionsQueryHandler = GetUserSessionsQueryHandler;
//# sourceMappingURL=GetUserSessionsQueryHandler.js.map