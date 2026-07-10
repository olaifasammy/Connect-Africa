import { Relationship } from '../entities/Relationship';

/**
 * Interface for Relationship Domain Policies.
 */
export interface IRelationshipPolicy {
  validate(relationship: Relationship): Promise<void>;
}
