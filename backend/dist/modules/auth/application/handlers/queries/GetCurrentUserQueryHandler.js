"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUserQueryHandler = void 0;
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../../shared/domain/UniqueEntityId");
class GetCurrentUserQueryHandler {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(query) {
        try {
            const user = await this.userRepository.findById(new UniqueEntityId_1.UniqueEntityId(query.userId));
            if (!user) {
                throw new AuthErrors_1.AuthenticationError('User not found');
            }
            AuditLogger_1.AuditLogger.log({
                user: query.userId,
                action: 'GET_CURRENT_USER',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: query.ipAddress
            });
            return user;
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: query.userId,
                action: 'GET_CURRENT_USER',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: query.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to get current user');
        }
    }
}
exports.GetCurrentUserQueryHandler = GetCurrentUserQueryHandler;
//# sourceMappingURL=GetCurrentUserQueryHandler.js.map