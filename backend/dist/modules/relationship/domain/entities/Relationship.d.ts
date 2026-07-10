import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { RelationshipId, EntityId, RelationshipTypeId } from '../value-objects/RelationshipValueObjects';
interface RelationshipProps {
    sourceEntityId: EntityId;
    targetEntityId: EntityId;
    relationshipTypeId: RelationshipTypeId;
    createdAt: Date;
}
/**
 * Relationship Aggregate Root.
 * Manages the lifecycle of a semantic relationship between two entities.
 */
export declare class Relationship extends AggregateRoot<RelationshipProps> {
    constructor(id: RelationshipId, props: RelationshipProps);
    get sourceEntityId(): EntityId;
    get targetEntityId(): EntityId;
    get relationshipTypeId(): RelationshipTypeId;
    get createdAt(): Date;
    /**
     * Validates core business invariants of a relationship.
     * @throws Error if invariants are violated.
     */
    private validateInvariants;
    /**
     * Factory method to create a new Relationship.
     */
    static create(id: RelationshipId, sourceEntityId: EntityId, targetEntityId: EntityId, relationshipTypeId: RelationshipTypeId): Relationship;
    /**
     * Reconstructs an existing Relationship from persistent storage.
     */
    static reconstruct(id: RelationshipId, sourceEntityId: EntityId, targetEntityId: EntityId, relationshipTypeId: RelationshipTypeId, createdAt: Date): Relationship;
}
export {};
