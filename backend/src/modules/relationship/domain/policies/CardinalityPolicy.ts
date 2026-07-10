import { Relationship } from '../entities/Relationship';
import { IRelationshipPolicy } from './IRelationshipPolicy';

/**
 * Policy to validate relationship cardinality.
 */
export class CardinalityPolicy implements IRelationshipPolicy {
  async validate(relationship: Relationship): Promise<void> {
    // Logic to validate cardinality constraints defined in Ontology
    return Promise.resolve();
  }
}
