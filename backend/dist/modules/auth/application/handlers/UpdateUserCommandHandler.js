"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class UpdateUserCommandHandler {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async handle(command) {
        try {
            const user = await this.userRepository.findById(new UniqueEntityId_1.UniqueEntityId(command.userIdToUpdate));
            if (!user) {
                throw new AuthErrors_1.AuthenticationError('User not found');
            }
            // Update user logic...
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'UPDATE_USER',
                resource: command.userIdToUpdate,
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'UPDATE_USER',
                resource: command.userIdToUpdate,
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to update user');
        }
    }
}
exports.UpdateUserCommandHandler = UpdateUserCommandHandler;
//# sourceMappingURL=UpdateUserCommandHandler.js.map