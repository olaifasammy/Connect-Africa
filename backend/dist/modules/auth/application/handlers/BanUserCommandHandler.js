"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanUserCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const UserBannedEvent_1 = require("../../../auth/domain/events/UserBannedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class BanUserCommandHandler {
    userRepository;
    eventBus;
    constructor(userRepository, eventBus) {
        this.userRepository = userRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            // Assuming AdminPolicy check here: AdminPolicy.isAdmin(adminRole, command.adminUserId);
            const user = await this.userRepository.findById(new UniqueEntityId_1.UniqueEntityId(command.userIdToBan));
            if (!user) {
                throw new AuthErrors_1.AuthenticationError('User not found');
            }
            user.ban();
            await this.userRepository.save(user);
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'BAN_USER',
                resource: command.userIdToBan,
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new UserBannedEvent_1.UserBannedEvent(user.id));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.adminUserId,
                action: 'BAN_USER',
                resource: command.userIdToBan,
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to ban user');
        }
    }
}
exports.BanUserCommandHandler = BanUserCommandHandler;
//# sourceMappingURL=BanUserCommandHandler.js.map