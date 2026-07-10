import { BaseError } from '@shared/errors/BaseError';

export class MetadataValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'METADATA_VALIDATION_ERROR');
  }
}

export class MetadataValidator {
  public static validate(props: { key: string; value: string }): void {
    if (!props.key || props.key.trim() === '') {
      throw new MetadataValidationError('Key is required');
    }
    if (!props.value || props.value.trim() === '') {
      throw new MetadataValidationError('Value is required');
    }
  }
}
