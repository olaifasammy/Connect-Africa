import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface IFavoriteEntityRepository {
    addFavorite(userId: UniqueEntityId, entityId: UniqueEntityId): Promise<void>;
    removeFavorite(userId: UniqueEntityId, entityId: UniqueEntityId): Promise<void>;
    getFavorites(userId: UniqueEntityId): Promise<UniqueEntityId[]>;
}
