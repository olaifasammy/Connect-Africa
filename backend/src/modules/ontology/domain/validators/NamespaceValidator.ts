import { BaseError } from '@shared/errors/BaseError';

export class NamespaceValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'NAMESPACE_VALIDATION_ERROR');
  }
}

export class NamespaceValidator {
  public static validate(namespace: string): void {
    if (!namespace || namespace.trim() === '') {
      throw new NamespaceValidationError('Namespace is required');
    }
    // Namespace pattern validation (e.g., must be a valid URI/URL identifier)
    const namespaceRegex = /^[a-zA-Z0-9_\-\.]+$/;
    if (!namespaceRegex.test(namespace)) {
      throw new NamespaceValidationError('Invalid namespace format');
    }
  }
}
