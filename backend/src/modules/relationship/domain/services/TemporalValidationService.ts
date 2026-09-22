import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Relationship } from '../entities/Relationship';
import { RelationshipValidationError } from '../errors/RelationshipErrors';

/**
 * Service responsible for validating temporal constraints of a relationship.
 */
@provide(TemporalValidationService, true)
@injectable()
export class TemporalValidationService {
  /**
   * Validates time range constraints and creation timestamp logic for a relationship.
   */
  async validate(relationship: Relationship): Promise<void> {
    const createdAt = relationship.createdAt;
    const now = new Date();

    if (Number.isNaN(createdAt.getTime())) {
      throw new RelationshipValidationError(
        'Temporal Constraint Violation: Relationship creation timestamp is invalid.',
      );
    }

    // Ensure timestamp is not in the far future (allowing 5-minute clock drift margin)
    if (createdAt.getTime() > now.getTime() + 5 * 60 * 1000) {
      throw new RelationshipValidationError(
        'Temporal Constraint Violation: Relationship creation timestamp cannot be in the future.',
      );
    }
  }
}
