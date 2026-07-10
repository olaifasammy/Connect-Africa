import { BaseError } from '@shared/errors/BaseError';

export class GraphValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'GRAPH_VALIDATION_ERROR');
  }
}

export class InvalidEntityError extends GraphValidationError {
  constructor(entityId: string) {
    super(`Invalid entity: ${entityId}`);
  }
}
