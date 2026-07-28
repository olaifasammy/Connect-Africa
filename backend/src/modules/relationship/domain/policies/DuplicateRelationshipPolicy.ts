import { Relationship } from '../entities/Relationship';
import { IRelationshipPolicy } from './IRelationshipPolicy';
import { IRelationshipRepository } from '../repositories/IRelationshipRepository';

/**
 * Policy to detect duplicate relationships.
 */
export class DuplicateRelationshipPolicy implements IRelationshipPolicy {
  constructor(private readonly repository: IRelationshipRepository) {}

  async validate(relationship: Relationship): Promise<void> {
    const exists = await this.repository.exists(relationship);
    if (exists) {
      throw new Error('Business Rule Violation: Relationship already exists.');
    }
  }
}
