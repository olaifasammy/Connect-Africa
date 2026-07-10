import { BaseError } from '@shared/errors/BaseError';

export class PropertyDefinitionValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'PROPERTY_DEFINITION_VALIDATION_ERROR');
  }
}

export class PropertyDefinitionValidator {
  public static validate(props: { name: string; dataType: string }): void {
    if (!props.name || props.name.trim() === '') {
      throw new PropertyDefinitionValidationError('Name is required');
    }
    if (!props.dataType || props.dataType.trim() === '') {
      throw new PropertyDefinitionValidationError('Data type is required');
    }
  }
}
