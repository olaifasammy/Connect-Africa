"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestoreAccountCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const UserRestoredEvent_1 = require("../../../auth/domain/events/UserRestoredEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class RestoreAccountCommandHandler {
    userRepository;
    eventBus;
    constructor(userRepository, eventBus) {
        this.userRepository = userRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            const user = await this.userRepository.findById(new UniqueEntityId_1.UniqueEntityId(command.userId));
            if (!user) {
                throw new AuthErrors_1.AuthenticationError('User not found');
            }
            // Assuming User entity would have a method: user.restore();
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'RESTORE_ACCOUNT',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new UserRestoredEvent_1.UserRestoredEvent(user.id));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'RESTORE_ACCOUNT',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to restore account');
        }
    }
}
exports.RestoreAccountCommandHandler = RestoreAccountCommandHandler;
//# sourceMappingURL=RestoreAccountCommandHandler.js.map