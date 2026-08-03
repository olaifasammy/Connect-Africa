import { injectable, inject } from 'inversify';
import { RelationshipDeletedEvent, RelationshipService } from '@modules/relationship/public';
import { IGraphRepository } from '../../domain/repositories/IGraphRepository';

@injectable()
export class RelationshipDeletedHandler {
  constructor(
    @inject('IGraphRepository') private readonly repository: IGraphRepository,
    @inject(RelationshipService) private readonly relationshipService: RelationshipService
  ) {}

  async handle(event: RelationshipDeletedEvent): Promise<void> {
    // If the event is enriched, use its properties directly
    if (event.sourceEntityId && event.targetEntityId && event.relationshipTypeId) {
      await this.repository.deleteEdge(
        event.sourceEntityId,
        event.targetEntityId,
        event.relationshipTypeId
      );
      return;
    }

    // Fallback: fetch using the Service if event is not enriched
    const relationship = await this.relationshipService.getRelationshipById(event.relationshipId);
    if (relationship) {
      await this.repository.deleteEdge(
        relationship.sourceEntityId,
        relationship.targetEntityId,
        relationship.relationshipTypeId
      );
    }
  }
}
