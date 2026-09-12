import { Entity } from '@shared/domain/Entity';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
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
export class RelationshipEvidence extends Entity<RelationshipEvidenceProps> {
  constructor(props: RelationshipEvidenceProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get relationshipId(): RelationshipId { return this.props.relationshipId; }
  get sourceUri(): string { return this.props.sourceUri; }
  get description(): string { return this.props.description; }
  get createdAt(): Date { return this.props.createdAt; }
}
