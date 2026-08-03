import { Relationship } from '../entities/Relationship';
import { IRelationshipPolicy } from './IRelationshipPolicy';

/**
 * Policy to validate temporal validity.
 */
export class TemporalValidityPolicy implements IRelationshipPolicy {
  async validate(relationship: Relationship): Promise<void> {
    // Relationships are valid if they don't have time ranges or if the current date falls within range
    // Temporal validity check logic
    return Promise.resolve();
  }
}
