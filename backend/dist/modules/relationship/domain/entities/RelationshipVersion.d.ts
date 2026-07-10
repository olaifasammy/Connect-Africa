import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { RelationshipId, VersionNumber, Metadata } from '../value-objects/RelationshipValueObjects';
/**
 * Props for the RelationshipVersion entity.
 */
interface RelationshipVersionProps {
    relationshipId: RelationshipId;
    versionNumber: VersionNumber;
    data: Metadata;
    createdAt: Date;
}
/**
 * RelationshipVersion Entity.
 * Represents a historical snapshot of a Relationship aggregate.
 */
export declare class RelationshipVersion extends Entity<RelationshipVersionProps> {
    constructor(props: RelationshipVersionProps, id?: UniqueEntityId);
    get relationshipId(): RelationshipId;
    get versionNumber(): VersionNumber;
    get data(): Metadata;
    get createdAt(): Date;
}
export {};
