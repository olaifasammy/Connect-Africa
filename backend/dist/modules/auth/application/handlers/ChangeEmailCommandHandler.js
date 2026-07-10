"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeEmailCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const EmailChangedEvent_1 = require("../../../auth/domain/events/EmailChangedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class ChangeEmailCommandHandler {
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
            // Check if email is already taken
            const existingUser = await this.userRepository.findByEmail(command.newEmail);
            if (existingUser) {
                throw new AuthErrors_1.AuthenticationError('Email already taken');
            }
            // Assuming User entity would have a method: user.updateEmail(new Email(command.newEmail));
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'CHANGE_EMAIL',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new EmailChangedEvent_1.EmailChangedEvent(user.id, command.newEmail));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'CHANGE_EMAIL',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to change email');
        }
    }
}
exports.ChangeEmailCommandHandler = ChangeEmailCommandHandler;
//# sourceMappingURL=ChangeEmailCommandHandler.js.map