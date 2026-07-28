import { BaseError } from '@shared/errors/BaseError';
import { Ontology } from '../entities/Ontology';

export class OntologyValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'ONTOLOGY_VALIDATION_ERROR');
  }
}

export class OntologyValidator {
  public static validate(props: { name: string; description: string }): void {
    if (!props.name || props.name.trim() === '') {
      throw new OntologyValidationError('Name is required');
    }
    if (!props.description || props.description.trim() === '') {
      throw new OntologyValidationError('Description is required');
    }
  }
}
