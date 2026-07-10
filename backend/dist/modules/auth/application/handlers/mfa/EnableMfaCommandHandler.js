"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnableMfaCommandHandler = exports.EnableMfaCommand = void 0;
const MfaEnabledEvent_1 = require("../../../../auth/domain/events/MfaEnabledEvent");
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
const UniqueEntityId_1 = require("../../../../../shared/domain/UniqueEntityId");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
class EnableMfaCommand {
    userId;
    ipAddress;
    constructor(userId, ipAddress) {
        this.userId = userId;
        this.ipAddress = ipAddress;
    }
}
exports.EnableMfaCommand = EnableMfaCommand;
class EnableMfaCommandHandler {
    userRepository;
    totpProvider;
    eventBus;
    constructor(userRepository, totpProvider, eventBus) {
        this.userRepository = userRepository;
        this.totpProvider = totpProvider;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            const secret = this.totpProvider.generateSecret();
            // Assume user repository update logic would go here
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'ENABLE_MFA',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new MfaEnabledEvent_1.MfaEnabledEvent(new UniqueEntityId_1.UniqueEntityId(command.userId)));
            return { secret };
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'ENABLE_MFA',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw new AuthErrors_1.AuthenticationError('Failed to enable MFA');
        }
    }
}
exports.EnableMfaCommandHandler = EnableMfaCommandHandler;
//# sourceMappingURL=EnableMfaCommandHandler.js.map