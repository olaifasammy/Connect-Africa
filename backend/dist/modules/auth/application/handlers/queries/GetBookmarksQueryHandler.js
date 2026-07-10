"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBookmarksQueryHandler = void 0;
const AuditLogger_1 = require("../../../../auth/infrastructure/AuditLogger");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../../shared/domain/UniqueEntityId");
class GetBookmarksQueryHandler {
    bookmarkRepository;
    constructor(bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }
    async handle(query) {
        try {
            const bookmarks = await this.bookmarkRepository.getBookmarks(new UniqueEntityId_1.UniqueEntityId(query.userId));
            AuditLogger_1.AuditLogger.log({
                user: query.userId,
                action: 'GET_BOOKMARKS',
                resource: 'BOOKMARKS',
                status: 'SUCCESS',
                ipAddress: query.ipAddress
            });
            return bookmarks;
        }
        catch (error) {
            AuditLogger_1.AuditLogger.log({
                user: query.userId,
                action: 'GET_BOOKMARKS',
                resource: 'BOOKMARKS',
                status: 'FAILURE',
                ipAddress: query.ipAddress
            });
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to get bookmarks');
        }
    }
}
exports.GetBookmarksQueryHandler = GetBookmarksQueryHandler;
//# sourceMappingURL=GetBookmarksQueryHandler.js.map