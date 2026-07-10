"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveRoleCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const RoleRemovedEvent_1 = require("../../../auth/domain/events/RoleRemovedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class RemoveRoleCommandHandler {
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
            // Logic to update user roles
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'REMOVE_ROLE',
                resource: command.userId,
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new RoleRemovedEvent_1.RoleRemovedEvent(user.id, command.role));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'REMOVE_ROLE',
                resource: command.userId,
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to remove role');
        }
    }
}
exports.RemoveRoleCommandHandler = RemoveRoleCommandHandler;
//# sourceMappingURL=RemoveRoleCommandHandler.js.map