"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuspendUserCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const UserSuspendedEvent_1 = require("../../../auth/domain/events/UserSuspendedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class SuspendUserCommandHandler {
    userRepository;
    eventBus;
    constructor(userRepository, eventBus) {
        this.userRepository = userRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            // Admin policy enforcement would be checked here
            const user = await this.userRepository.findById(new UniqueEntityId_1.UniqueEntityId(command.userIdToSuspend));
            if (!user) {
                throw new AuthErrors_1.AuthenticationError('User not found');
            }
            // Assuming User entity would have a method: user.suspend();
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'SUSPEND_USER',
                resource: command.userIdToSuspend,
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new UserSuspendedEvent_1.UserSuspendedEvent(user.id));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'SUSPEND_USER',
                resource: command.userIdToSuspend,
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to suspend user');
        }
    }
}
exports.SuspendUserCommandHandler = SuspendUserCommandHandler;
//# sourceMappingURL=SuspendUserCommandHandler.js.map