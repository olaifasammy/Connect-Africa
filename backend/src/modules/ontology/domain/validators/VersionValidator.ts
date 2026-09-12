import { BaseError } from '@shared/errors/BaseError';

export class VersionValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'VERSION_VALIDATION_ERROR');
  }
}

export class VersionValidator {
  public static validate(version: number): void {
    if (isNaN(version) || version <= 0) {
      throw new VersionValidationError('Version must be a positive number');
    }
  }
}
