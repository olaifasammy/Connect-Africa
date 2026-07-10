"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshCommandHandler = exports.RefreshCommand = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
class RefreshCommand {
    refreshToken;
    userId;
    ipAddress;
    constructor(refreshToken, userId, ipAddress) {
        this.refreshToken = refreshToken;
        this.userId = userId;
        this.ipAddress = ipAddress;
    }
}
exports.RefreshCommand = RefreshCommand;
class RefreshCommandHandler {
    jwtProvider;
    constructor(jwtProvider) {
        this.jwtProvider = jwtProvider;
    }
    async handle(command) {
        try {
            const userId = this.jwtProvider.verifyToken(command.refreshToken);
            const newToken = this.jwtProvider.generateToken(userId);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'REFRESH_TOKEN',
                resource: 'AUTH',
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            return newToken;
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'REFRESH_TOKEN',
                resource: 'AUTH',
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw new AuthErrors_1.AuthenticationError('Failed to refresh token');
        }
    }
}
exports.RefreshCommandHandler = RefreshCommandHandler;
//# sourceMappingURL=RefreshCommandHandler.js.map