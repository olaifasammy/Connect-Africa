import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface ISavedArticleRepository {
    saveArticle(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<void>;
    removeSavedArticle(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<void>;
    getSavedArticles(userId: UniqueEntityId): Promise<UniqueEntityId[]>;
}
