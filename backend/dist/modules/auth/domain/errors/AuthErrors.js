"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteArticleError = exports.FavoriteEntityError = exports.RecentSearchError = exports.CollectionError = exports.SavedResearchError = exports.ContinueReadingError = exports.ReadingHistoryError = exports.SessionNotFoundError = exports.AuthenticationError = void 0;
const BaseError_1 = require("../../../../shared/errors/BaseError");
class AuthenticationError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ERR_AUTHENTICATION');
    }
}
exports.AuthenticationError = AuthenticationError;
class SessionNotFoundError extends BaseError_1.BaseError {
    constructor() {
        super('Session not found', 'ERR_SESSION_NOT_FOUND');
    }
}
exports.SessionNotFoundError = SessionNotFoundError;
class ReadingHistoryError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ERR_READING_HISTORY');
    }
}
exports.ReadingHistoryError = ReadingHistoryError;
class ContinueReadingError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ERR_CONTINUE_READING');
    }
}
exports.ContinueReadingError = ContinueReadingError;
class SavedResearchError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ERR_SAVED_RESEARCH');
    }
}
exports.SavedResearchError = SavedResearchError;
class CollectionError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ERR_COLLECTION');
    }
}
exports.CollectionError = CollectionError;
class RecentSearchError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ERR_RECENT_SEARCH');
    }
}
exports.RecentSearchError = RecentSearchError;
class FavoriteEntityError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ERR_FAVORITE_ENTITY');
    }
}
exports.FavoriteEntityError = FavoriteEntityError;
class FavoriteArticleError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 'ERR_FAVORITE_ARTICLE');
    }
}
exports.FavoriteArticleError = FavoriteArticleError;
//# sourceMappingURL=AuthErrors.js.map