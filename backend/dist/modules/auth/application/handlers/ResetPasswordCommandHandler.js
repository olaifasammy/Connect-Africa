"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const PasswordResetEvent_1 = require("../../../auth/domain/events/PasswordResetEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
class ResetPasswordCommandHandler {
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
            // In a real implementation, we would validate the reset token here.
            const user = await this.userRepository.findByEmail(command.email);
            if (!user) {
                throw new AuthErrors_1.AuthenticationError('User not found');
            }
            const hashedPassword = await this.passwordHasher.hash(command.newPassword);
            // Assuming User entity has a method to update password
            // user.updatePassword(new PasswordHash(hashedPassword));
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({
                user: user.id.toString(),
                action: 'RESET_PASSWORD',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new PasswordResetEvent_1.PasswordResetEvent(user.id));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.email,
                action: 'RESET_PASSWORD',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to reset password');
        }
    }
}
exports.ResetPasswordCommandHandler = ResetPasswordCommandHandler;
//# sourceMappingURL=ResetPasswordCommandHandler.js.map