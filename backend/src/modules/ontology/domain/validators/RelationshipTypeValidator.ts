import { BaseError } from '@shared/errors/BaseError';
import { RelationshipType } from '../entities/RelationshipType';

export class RelationshipTypeValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'RELATIONSHIP_TYPE_VALIDATION_ERROR');
  }
}

export class RelationshipTypeValidator {
  public static validate(props: { name: string; description: string }): void {
    if (!props.name || props.name.trim() === '') {
      throw new RelationshipTypeValidationError('Name is required');
    }
    if (!props.description || props.description.trim() === '') {
      throw new RelationshipTypeValidationError('Description is required');
    }
  }
}
