import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
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
export class RelationshipVersion extends Entity<RelationshipVersionProps> {
  constructor(props: RelationshipVersionProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get relationshipId(): RelationshipId { return this.props.relationshipId; }
  get versionNumber(): VersionNumber { return this.props.versionNumber; }
  get data(): Metadata { return this.props.data; }
  get createdAt(): Date { return this.props.createdAt; }
}
