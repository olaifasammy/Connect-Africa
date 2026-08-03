import { Relationship } from '../entities/Relationship';
import { IRelationshipPolicy } from './IRelationshipPolicy';

/**
 * Policy to detect circular relationships.
 */
export class CircularRelationshipPolicy implements IRelationshipPolicy {
  async validate(relationship: Relationship): Promise<void> {
    // Logic to traverse graph and detect cycle
    // Placeholder for actual graph traversal logic
    return Promise.resolve();
  }
}
