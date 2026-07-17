import { RelationshipDeletedEvent } from '@modules/relationship/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';
import { IRelationshipRepository } from '@modules/relationship/public';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RelationshipDeletedHandler {
  constructor(
    private readonly repository: IGraphRepository,
    private readonly relationshipRepository: IRelationshipRepository
  ) {}

  async handle(event: RelationshipDeletedEvent): Promise<void> {
    const relationship = await this.relationshipRepository.findById(new UniqueEntityId(event.relationshipId));
    if (relationship) {
      await this.repository.deleteEdge(
        relationship.sourceEntityId.getProps().value,
        relationship.targetEntityId.getProps().value,
        relationship.relationshipTypeId.getProps().value
      );
    }
  }
}
