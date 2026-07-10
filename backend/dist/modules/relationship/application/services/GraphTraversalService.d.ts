import { RelationshipId } from '../../domain/value-objects/RelationshipValueObjects';
/**
 * Application service for graph traversal operations related to relationships.
 */
export declare class GraphTraversalService {
    getConnectedEntities(relationshipId: RelationshipId): Promise<void>;
}
