import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IGraphIntegrationService {
  linkArticleToEntity(articleId: UniqueEntityId, entityId: UniqueEntityId): Promise<void>;
  linkArticleToRelationship(articleId: UniqueEntityId, relationshipId: UniqueEntityId): Promise<void>;
}
