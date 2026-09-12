import { injectable } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { RelationshipId } from '../../domain/value-objects/RelationshipValueObjects';

/**
 * Application service for graph traversal operations related to relationships.
 */
@provide(GraphTraversalService, true)
@injectable()
export class GraphTraversalService {
  async getConnectedEntities(relationshipId: RelationshipId): Promise<void> {
    // Logic to interact with graph engine
  }
}
