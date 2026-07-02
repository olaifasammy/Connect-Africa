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
