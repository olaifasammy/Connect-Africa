import { BaseError } from '@shared/errors/BaseError';

export class VersionValidationError extends BaseError {
  constructor(message: string) {
    super(
      message,
      'VERSION_VALIDATION_ERROR',
    );
  }
}

export class VersionValidator {
  public static validate(
    version: number,
  ): void {
    if (
      !Number.isInteger(version) ||
      version < 1
    ) {
      throw new VersionValidationError(
        'Version must be an integer greater than or equal to 1.',
      );
    }
  }
}