import { Relationship } from '../entities/Relationship';
import { RelationshipId } from '../value-objects/RelationshipValueObjects';

/**
 * Canonical repository contract for the Relationship bounded context.
 *
 * Relationship owns the authoritative semantic edge. Graph consumes
 * relationship state as a downstream graph representation.
 */
export interface IRelationshipRepository {
  save(
    relationship: Relationship,
  ): Promise<void>;

  findById(
    id: RelationshipId,
  ): Promise<Relationship | null>;

  exists(
    relationship: Relationship,
  ): Promise<boolean>;

  update(
    relationship: Relationship,
  ): Promise<void>;

  delete(
    id: RelationshipId,
  ): Promise<void>;

  list(
    limit: number,
    offset: number,
  ): Promise<Relationship[]>;
}