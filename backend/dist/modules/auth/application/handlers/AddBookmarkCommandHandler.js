"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBookmarkCommandHandler = void 0;
const AuditLogger_1 = require("../../../auth/infrastructure/AuditLogger");
const ArticleBookmarkedEvent_1 = require("../../../auth/domain/events/ArticleBookmarkedEvent");
const AuthErrors_1 = require("../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class AddBookmarkCommandHandler {
    bookmarkRepository;
    eventBus;
    constructor(bookmarkRepository, eventBus) {
        this.bookmarkRepository = bookmarkRepository;
        this.eventBus = eventBus;
    }
    async handle(command) {
        try {
            const userId = new UniqueEntityId_1.UniqueEntityId(command.userId);
            const articleId = new UniqueEntityId_1.UniqueEntityId(command.articleId);
            await this.bookmarkRepository.addBookmark(userId, articleId);
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'ADD_BOOKMARK',
                resource: command.articleId,
                status: 'SUCCESS',
                ipAddress: command.ipAddress
            });
            await this.eventBus.publish(new ArticleBookmarkedEvent_1.ArticleBookmarkedEvent(userId, articleId));
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: command.userId,
                action: 'ADD_BOOKMARK',
                resource: command.articleId,
                status: 'FAILURE',
                ipAddress: command.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to add bookmark');
        }
    }
}
exports.AddBookmarkCommandHandler = AddBookmarkCommandHandler;
//# sourceMappingURL=AddBookmarkCommandHandler.js.map