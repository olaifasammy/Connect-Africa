import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Relationship } from '../entities/Relationship';

/**
 * Service responsible for validating temporal constraints of a relationship.
 */
@provide(TemporalValidationService, true)
@injectable()
export class TemporalValidationService {
  async validate(relationship: Relationship): Promise<void> {
    // Logic to validate time range constraints
  }
}
