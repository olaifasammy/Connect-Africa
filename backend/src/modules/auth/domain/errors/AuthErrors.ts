import { BaseError } from '@shared/errors/BaseError';

export class AuthenticationError extends BaseError {
  constructor(message: string) {
    super(message, 'ERR_AUTHENTICATION');
  }
}

export class SessionNotFoundError extends BaseError {
  constructor() {
    super('Session not found', 'ERR_SESSION_NOT_FOUND');
  }
}

export class SavedResearchError extends BaseError {
  constructor(message: string) {
    super(message, 'ERR_SAVED_RESEARCH');
  }
}

export class CollectionError extends BaseError {
  constructor(message: string) {
    super(message, 'ERR_COLLECTION');
  }
}

export class FavoriteEntityError extends BaseError {
  constructor(message: string) {
    super(message, 'ERR_FAVORITE_ENTITY');
  }
}

export class FavoriteArticleError extends BaseError {
  constructor(message: string) {
    super(message, 'ERR_FAVORITE_ARTICLE');
  }
}
