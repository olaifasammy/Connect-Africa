import { BaseError } from '../../../../shared/errors/BaseError';
export declare class AuthenticationError extends BaseError {
    constructor(message: string);
}
export declare class SessionNotFoundError extends BaseError {
    constructor();
}
export declare class ReadingHistoryError extends BaseError {
    constructor(message: string);
}
export declare class ContinueReadingError extends BaseError {
    constructor(message: string);
}
export declare class SavedResearchError extends BaseError {
    constructor(message: string);
}
export declare class CollectionError extends BaseError {
    constructor(message: string);
}
export declare class RecentSearchError extends BaseError {
    constructor(message: string);
}
export declare class FavoriteEntityError extends BaseError {
    constructor(message: string);
}
export declare class FavoriteArticleError extends BaseError {
    constructor(message: string);
}
