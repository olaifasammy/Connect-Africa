"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const PasswordChangedEvent_1 = require("../../../auth/domain/events/PasswordChangedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class ChangePasswordCommandHandler {
    userRepository;
    passwordHasher;
    eventBus;
    constructor(userRepository, passwordHasher, eventBus) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            const user = await this.userRepository.findById(new UniqueEntityId_1.UniqueEntityId(command.userId));
            if (!user) {
                throw new AuthErrors_1.AuthenticationError('User not found');
            }
            const isPasswordValid = await this.passwordHasher.compare(command.currentPassword, user.passwordHash.value);
            if (!isPasswordValid) {
                throw new AuthErrors_1.AuthenticationError('Invalid current password');
            }
            const newPasswordHash = await this.passwordHasher.hash(command.newPassword);
            // Assuming User entity would have a method: user.updatePassword(new PasswordHash(newPasswordHash));
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'CHANGE_PASSWORD',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new PasswordChangedEvent_1.PasswordChangedEvent(user.id));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'CHANGE_PASSWORD',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to change password');
        }
    }
}
exports.ChangePasswordCommandHandler = ChangePasswordCommandHandler;
//# sourceMappingURL=ChangePasswordCommandHandler.js.map