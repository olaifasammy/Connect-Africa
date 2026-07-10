import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface IRecentSearchRepository {
    addSearch(userId: UniqueEntityId, query: string): Promise<void>;
    getRecentSearches(userId: UniqueEntityId): Promise<string[]>;
}
