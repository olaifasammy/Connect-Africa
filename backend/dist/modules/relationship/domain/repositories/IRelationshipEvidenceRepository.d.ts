import { RelationshipEvidence } from '../entities/RelationshipEvidence';
import { RelationshipId } from '../value-objects/RelationshipValueObjects';
/**
 * Interface for the Relationship Evidence repository.
 */
export interface IRelationshipEvidenceRepository {
    save(evidence: RelationshipEvidence): Promise<void>;
    findByRelationshipId(relationshipId: RelationshipId): Promise<RelationshipEvidence[]>;
}
