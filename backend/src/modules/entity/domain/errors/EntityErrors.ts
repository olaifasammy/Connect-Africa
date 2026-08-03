export class EntityError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = 'EntityError';
  }
}

export class ValidationError extends EntityError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message);
  }
}

export class UnauthorizedError extends EntityError {
  constructor(message: string = 'Unauthorized') {
    super('UNAUTHORIZED', message);
  }
}
