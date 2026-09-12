import { BaseError } from '@shared/errors/BaseError';

export class ArticleDomainError extends BaseError {
  constructor(message: string) {
    super(message, 'ERR_ARTICLE_DOMAIN');
  }
}

export class ArticleConflictError extends BaseError {
  constructor(message: string) {
    super(message, 'ARTICLE_CONFLICT_ERROR');
  }
}

export class ReadingHistoryError extends BaseError {
  constructor(message: string) {
    super(message, 'ERR_READING_HISTORY');
  }
}

export class ContinueReadingError extends BaseError {
  constructor(message: string) {
    super(message, 'ERR_CONTINUE_READING');
  }
}

export class RecentSearchError extends BaseError {
  constructor(message: string) {
    super(message, 'ERR_RECENT_SEARCH');
  }
}
