import { BaseError } from '@shared/errors/BaseError';

export class RelationshipValidationError
  extends BaseError
{
  constructor(message: string) {
    super(
      message,
      'RELATIONSHIP_VALIDATION_ERROR',
    );
  }
}

export class RelationshipNotFoundError
  extends BaseError
{
  constructor(message: string) {
    super(
      message,
      'RELATIONSHIP_NOT_FOUND_ERROR',
    );
  }
}

export class RelationshipConflictError
  extends BaseError
{
  constructor(message: string) {
    super(
      message,
      'RELATIONSHIP_CONFLICT_ERROR',
    );
  }
}