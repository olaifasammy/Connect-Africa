import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface ICollectionRepository {
    createCollection(userId: UniqueEntityId, name: string): Promise<UniqueEntityId>;
    addArticleToCollection(collectionId: UniqueEntityId, articleId: UniqueEntityId): Promise<void>;
    getCollections(userId: UniqueEntityId): Promise<any[]>;
}
