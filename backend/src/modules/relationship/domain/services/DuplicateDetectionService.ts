import { Relationship } from '../entities/Relationship';
import { IRelationshipRepository } from '../repositories/IRelationshipRepository';

/**
 * Service responsible for detecting duplicate relationship instances.
 */
export class DuplicateDetectionService {
  constructor(private readonly repository: IRelationshipRepository) {}

  async exists(relationship: Relationship): Promise<boolean> {
    // Logic to check repository for existing relationship with same source, target, type
    return await this.repository.exists(relationship);
  }
}
