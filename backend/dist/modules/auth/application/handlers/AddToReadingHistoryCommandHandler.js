"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToReadingHistoryCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class AddToReadingHistoryCommandHandler {
    repository;
    eventBus;
    constructor(repository, eventBus) {
        this.repository = repository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            const userId = new UniqueEntityId_1.UniqueEntityId(command.userId);
            const articleId = new UniqueEntityId_1.UniqueEntityId(command.articleId);
            await this.repository.addEntry(userId, articleId);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'ADD_READING_HISTORY',
                resource: command.articleId,
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'ADD_READING_HISTORY',
                resource: command.articleId,
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to add to reading history');
        }
    }
}
exports.AddToReadingHistoryCommandHandler = AddToReadingHistoryCommandHandler;
//# sourceMappingURL=AddToReadingHistoryCommandHandler.js.map