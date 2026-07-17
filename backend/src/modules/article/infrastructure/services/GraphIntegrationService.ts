import { IGraphIntegrationService } from '../../domain/interfaces/IGraphIntegrationService';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';
import { CreateGraphEdgeHandler, CreateGraphEdgeCommand } from '@modules/graph/public';

export class GraphIntegrationService implements IGraphIntegrationService {
  constructor(private readonly createEdgeHandler: CreateGraphEdgeHandler) {}

  async linkArticleToEntity(articleId: UniqueEntityId, entityId: UniqueEntityId): Promise<void> {
    const command = new CreateGraphEdgeCommand(articleId.toString(), entityId.toString(), 'MENTIONS');
    await this.createEdgeHandler.handle(command, 'system', '127.0.0.1');
  }

  async linkArticleToRelationship(articleId: UniqueEntityId, relationshipId: UniqueEntityId): Promise<void> {
    const command = new CreateGraphEdgeCommand(articleId.toString(), relationshipId.toString(), 'CITES_RELATIONSHIP');
    await this.createEdgeHandler.handle(command, 'system', '127.0.0.1');
  }

  async linkArticleToCitation(articleId: UniqueEntityId, sourceId: UniqueEntityId): Promise<void> {
    // TODO: Replace with real graph implementation when available
    const command = new CreateGraphEdgeCommand(articleId.toString(), sourceId.toString(), 'CITES_SOURCE');
    await this.createEdgeHandler.handle(command, 'system', '127.0.0.1');
  }
}
