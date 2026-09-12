import { BaseError } from '@shared/errors/BaseError';

export class MfaAuthenticationError extends BaseError {
  constructor(message: string) {
    super(message, 'ERR_MFA_AUTH');
  }
}
