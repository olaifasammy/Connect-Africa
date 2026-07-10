import { RelationshipVersion } from '../entities/RelationshipVersion';
import { RelationshipId } from '../value-objects/RelationshipValueObjects';
/**
 * Interface for the Relationship Version repository.
 */
export interface IRelationshipVersionRepository {
    save(version: RelationshipVersion): Promise<void>;
    findByRelationshipId(relationshipId: RelationshipId): Promise<RelationshipVersion[]>;
}
