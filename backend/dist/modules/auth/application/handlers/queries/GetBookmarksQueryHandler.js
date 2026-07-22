"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetBookmarksQueryHandler = void 0;
const public_1 = require("../../../../audit/public");
const AuthErrors_1 = require("../../../../auth/domain/errors/AuthErrors");
const UniqueEntityId_1 = require("../../../../../shared/domain/UniqueEntityId");
class GetBookmarksQueryHandler {
    bookmarkRepository;
    eventBus;
    constructor(bookmarkRepository, eventBus) {
        this.bookmarkRepository = bookmarkRepository;
        this.eventBus = eventBus;
    }
    async handle(query) {
        try {
            const bookmarks = await this.bookmarkRepository.getBookmarks(new UniqueEntityId_1.UniqueEntityId(query.userId));
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'GET_BOOKMARKS',
                actorId: query.userId,
                actorType: 'USER',
                resourceId: 'BOOKMARKS',
                resourceType: 'BOOKMARKS',
                ipAddress: query.ipAddress || '127.0.0.1',
                userAgent: 'unknown',
                metadata: [{ key: 'status', value: 'SUCCESS' }]
            }));
            return bookmarks;
        }
        catch (error) {
            await this.eventBus.publish(new public_1.AuditLogRequestedEvent({
                action: 'GET_BOOKMARKS',
                actorId: query.userId,
                actorType: 'USER',
                resourceId: 'BOOKMARKS',
                resourceType: 'BOOKMARKS',
                ipAddress: query.ipAddress || '127.0.0.1',
                userAgent: 'unknown',
                metadata: [{ key: 'status', value: 'FAILURE' }]
            }));
            throw error instanceof AuthErrors_1.AuthenticationError ? error : new AuthErrors_1.AuthenticationError('Failed to get bookmarks');
        }
    }
}
exports.GetBookmarksQueryHandler = GetBookmarksQueryHandler;
//# sourceMappingURL=GetBookmarksQueryHandler.js.map