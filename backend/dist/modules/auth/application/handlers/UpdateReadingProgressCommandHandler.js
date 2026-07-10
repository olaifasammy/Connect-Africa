"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReadingProgressCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class UpdateReadingProgressCommandHandler {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async handle(command) {
        try {
            const userId = new UniqueEntityId_1.UniqueEntityId(command.userId);
            const articleId = new UniqueEntityId_1.UniqueEntityId(command.articleId);
            await this.repository.updateProgress(userId, articleId, command.progress);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'UPDATE_READING_PROGRESS',
                resource: command.articleId,
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'UPDATE_READING_PROGRESS',
                resource: command.articleId,
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.ContinueReadingError ? error : new AuthErrors_1.ContinueReadingError('Failed to update reading progress');
        }
    }
}
exports.UpdateReadingProgressCommandHandler = UpdateReadingProgressCommandHandler;
//# sourceMappingURL=UpdateReadingProgressCommandHandler.js.map