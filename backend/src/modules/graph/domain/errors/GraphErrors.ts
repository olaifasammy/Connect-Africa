import { BaseError } from '@shared/errors/BaseError';

export class GraphValidationError extends BaseError {
  constructor(message: string) {
    super(message, 'GRAPH_VALIDATION_ERROR');
  }
}

export class GraphNotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 'GRAPH_NOT_FOUND_ERROR');
  }
}

export class GraphConflictError extends BaseError {
  constructor(message: string) {
    super(message, 'GRAPH_CONFLICT_ERROR');
  }
}

export class InvalidEntityError extends GraphValidationError {
  constructor(entityId: string) {
    super(`Invalid entity: ${entityId}`);
  }
}