"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSessionRepository = void 0;
const AuditLogger_1 = require("../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../auth/domain/errors/AuthErrors");
class RedisSessionRepository {
    redisClient;
    constructor(redisClient) {
        this.redisClient = redisClient;
    }
    async createSession(userId, token) {
        try {
            const key = `session:${token}`;
            await this.redisClient.set(key, userId.toString(), 'EX', 3600);
            AuditLogger_1.AuditLogger.log({
                user: userId.toString(),
                action: 'SESSION_CREATED',
                resource: 'SESSION',
                status: 'SUCCESS'
            });
        }
        catch (error) {
            throw new AuthErrors_1.AuthenticationError('Failed to create session');
        }
    }
    async invalidateSession(token) {
        try {
            const key = `session:${token}`;
            const userId = await this.redisClient.get(key);
            await this.redisClient.del(key);
            if (userId) {
                AuditLogger_1.AuditLogger.log({
                    user: userId,
                    action: 'SESSION_INVALIDATED',
                    resource: 'SESSION',
                    status: 'SUCCESS'
                });
            }
        }
        catch (error) {
            throw new AuthErrors_1.AuthenticationError('Failed to invalidate session');
        }
    }
}
exports.RedisSessionRepository = RedisSessionRepository;
//# sourceMappingURL=RedisSessionRepository.js.map