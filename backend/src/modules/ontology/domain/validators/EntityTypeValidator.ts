import { BaseError } from '@shared/errors/BaseError';
import { EntityType } from '../entities/EntityType';

export class EntityTypeValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'ENTITY_TYPE_VALIDATION_ERROR');
  }
}

export class EntityTypeValidator {
  public static validate(props: { name: string; description: string }): void {
    if (!props.name || props.name.trim() === '') {
      throw new EntityTypeValidationError('Name is required');
    }
    if (!props.description || props.description.trim() === '') {
      throw new EntityTypeValidationError('Description is required');
    }
  }
}
