"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceLogoutCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const SessionRevokedEvent_1 = require("../../../auth/domain/events/SessionRevokedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class ForceLogoutCommandHandler {
    sessionRepository;
    eventBus;
    constructor(sessionRepository, eventBus) {
        this.sessionRepository = sessionRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            // In a real scenario, this would invalidate all sessions for the userId
            await this.sessionRepository.invalidateSession(command.userId);
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'FORCE_LOGOUT',
                resource: command.userId,
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new SessionRevokedEvent_1.SessionRevokedEvent(new UniqueEntityId_1.UniqueEntityId(command.userId), 'ALL'));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'FORCE_LOGOUT',
                resource: command.userId,
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to force logout');
        }
    }
}
exports.ForceLogoutCommandHandler = ForceLogoutCommandHandler;
//# sourceMappingURL=ForceLogoutCommandHandler.js.map