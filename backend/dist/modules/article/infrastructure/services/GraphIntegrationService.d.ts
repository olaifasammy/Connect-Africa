import { IGraphIntegrationService } from '../../domain/interfaces/IGraphIntegrationService';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { CreateGraphEdgeHandler } from '../../../graph/public';
export declare class GraphIntegrationService implements IGraphIntegrationService {
    private readonly createEdgeHandler;
    constructor(createEdgeHandler: CreateGraphEdgeHandler);
    linkArticleToEntity(articleId: UniqueEntityId, entityId: UniqueEntityId): Promise<void>;
    linkArticleToRelationship(articleId: UniqueEntityId, relationshipId: UniqueEntityId): Promise<void>;
    linkArticleToCitation(articleId: UniqueEntityId, sourceId: UniqueEntityId): Promise<void>;
}
