import { Relationship } from '../entities/Relationship';
import { RelationshipVersion } from '../entities/RelationshipVersion';
/**
 * Service responsible for creating and managing versions of a relationship.
 */
export declare class RelationshipVersionService {
    createVersion(relationship: Relationship): Promise<RelationshipVersion>;
}
