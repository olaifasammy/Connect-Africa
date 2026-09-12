import { BaseError } from '@shared/errors/BaseError';

import { PropertyDefinition } from '../value-objects/PropertyDefinition';

export class PropertyDefinitionValidationError
  extends BaseError
{
  constructor(message: string) {
    super(
      message,
      'PROPERTY_DEFINITION_VALIDATION_ERROR',
    );
  }
}

export class PropertyDefinitionValidator {
  public static validate(props: {
    name: string;
    dataType: string;
  }): void {
    const name = props.name?.trim();

    if (!name) {
      throw new PropertyDefinitionValidationError(
        'Name is required.',
      );
    }

    if (name.length > 255) {
      throw new PropertyDefinitionValidationError(
        'Name cannot exceed 255 characters.',
      );
    }

    const dataType =
      props.dataType?.trim().toUpperCase();

    if (!dataType) {
      throw new PropertyDefinitionValidationError(
        'Data type is required.',
      );
    }

    try {
      PropertyDefinition.create(
        dataType,
      );
    } catch {
      throw new PropertyDefinitionValidationError(
        `Unsupported property data type: ${dataType}.`,
      );
    }
  }
}