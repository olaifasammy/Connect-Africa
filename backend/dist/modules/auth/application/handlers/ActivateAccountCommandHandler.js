"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivateAccountCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const AccountActivatedEvent_1 = require("../../../auth/domain/events/AccountActivatedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class ActivateAccountCommandHandler {
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
            user.activate();
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'ACTIVATE_ACCOUNT',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new AccountActivatedEvent_1.AccountActivatedEvent(user.id));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'ACTIVATE_ACCOUNT',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to activate account');
        }
    }
}
exports.ActivateAccountCommandHandler = ActivateAccountCommandHandler;
//# sourceMappingURL=ActivateAccountCommandHandler.js.map