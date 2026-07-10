"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutCommandHandler = exports.LogoutCommand = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger"); // Fixed path
const SessionRevokedEvent_1 = require("../../../auth/domain/events/SessionRevokedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
class LogoutCommand {
    token;
    userId;
    ipAddress;
    constructor(token, userId, ipAddress) {
        this.token = token;
        this.userId = userId;
        this.ipAddress = ipAddress;
    }
}
exports.LogoutCommand = LogoutCommand;
class LogoutCommandHandler {
    sessionRepository;
    eventBus;
    constructor(sessionRepository, eventBus) {
        this.sessionRepository = sessionRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            await this.sessionRepository.invalidateSession(command.token);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'LOGOUT',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new SessionRevokedEvent_1.SessionRevokedEvent(command.userId, command.token));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'LOGOUT',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw new AuthErrors_1.AuthenticationError('Failed to logout');
        }
    }
}
exports.LogoutCommandHandler = LogoutCommandHandler;
//# sourceMappingURL=LogoutCommandHandler.js.map