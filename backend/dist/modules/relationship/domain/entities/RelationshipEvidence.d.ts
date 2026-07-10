import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { RelationshipId } from '../value-objects/RelationshipValueObjects';
/**
 * Props for the RelationshipEvidence entity.
 */
interface RelationshipEvidenceProps {
    relationshipId: RelationshipId;
    sourceUri: string;
    description: string;
    createdAt: Date;
}
/**
 * RelationshipEvidence Entity.
 * Represents evidence supporting a Relationship aggregate.
 */
export declare class RelationshipEvidence extends Entity<RelationshipEvidenceProps> {
    constructor(props: RelationshipEvidenceProps, id?: UniqueEntityId);
    get relationshipId(): RelationshipId;
    get sourceUri(): string;
    get description(): string;
    get createdAt(): Date;
}
export {};
