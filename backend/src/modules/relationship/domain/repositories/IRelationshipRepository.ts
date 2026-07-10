import { Relationship } from '../entities/Relationship';
import { RelationshipId } from '../value-objects/RelationshipValueObjects';

/**
 * Interface for the Relationship repository.
 */
export interface IRelationshipRepository {
  save(relationship: Relationship): Promise<void>;
  findById(id: RelationshipId): Promise<Relationship | null>;
  exists(relationship: Relationship): Promise<boolean>;
  delete(id: RelationshipId): Promise<void>;
}
