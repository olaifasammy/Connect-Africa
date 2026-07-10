import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface IFavoriteArticleRepository {
    addFavorite(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<void>;
    removeFavorite(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<void>;
    getFavorites(userId: UniqueEntityId): Promise<UniqueEntityId[]>;
}
