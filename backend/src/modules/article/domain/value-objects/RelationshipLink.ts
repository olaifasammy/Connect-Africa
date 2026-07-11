import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RelationshipLink {
  constructor(public readonly relationshipId: UniqueEntityId) {}
}
