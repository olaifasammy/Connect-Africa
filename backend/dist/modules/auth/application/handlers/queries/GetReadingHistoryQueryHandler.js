"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReadingHistoryQueryHandler = void 0;
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../../shared/domain/UniqueEntityId");
class GetReadingHistoryQueryHandler {
    historyRepository;
    constructor(historyRepository) {
        this.historyRepository = historyRepository;
    }
    async handle(query) {
        try {
            const history = await this.historyRepository.getHistory(new UniqueEntityId_1.UniqueEntityId(query.userId));
            AuditLogger_1.AuditLogger.log({
                user: query.userId,
                action: 'GET_READING_HISTORY',
                resource: 'HISTORY',
                status: 'SUCCESS',
                ipAddress: query.ipAddress
            });
            return history;
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: query.userId,
                action: 'GET_READING_HISTORY',
                resource: 'HISTORY',
                status: 'FAILURE',
                ipAddress: query.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to get reading history');
        }
    }
}
exports.GetReadingHistoryQueryHandler = GetReadingHistoryQueryHandler;
//# sourceMappingURL=GetReadingHistoryQueryHandler.js.map