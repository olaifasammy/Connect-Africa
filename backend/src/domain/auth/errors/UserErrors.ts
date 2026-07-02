import { BaseError } from '@shared/errors/BaseError';

export class InvalidEmailError extends BaseError {
  constructor(email: string) {
    super(`Invalid email format: ${email}`, 'ERR_INVALID_EMAIL');
  }
}

export class PasswordTooWeakError extends BaseError {
  constructor() {
    super('Password does not meet security requirements', 'ERR_PASSWORD_TOO_WEAK');
  }
}
