"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreUserCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const UserRestoredEvent_1 = require("../../../auth/domain/events/UserRestoredEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class RestoreUserCommandHandler {
    userRepository;
    eventBus;
    constructor(userRepository, eventBus) {
        this.userRepository = userRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            const user = await this.userRepository.findById(new UniqueEntityId_1.UniqueEntityId(command.userIdToRestore));
            if (!user) {
                throw new AuthErrors_1.AuthenticationError('User not found');
            }
            // Assuming user.restore() exists
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'RESTORE_USER',
                resource: command.userIdToRestore,
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new UserRestoredEvent_1.UserRestoredEvent(user.id));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'RESTORE_USER',
                resource: command.userIdToRestore,
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to restore user');
        }
    }
}
exports.RestoreUserCommandHandler = RestoreUserCommandHandler;
//# sourceMappingURL=RestoreUserCommandHandler.js.map