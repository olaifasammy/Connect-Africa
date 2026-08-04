import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IUserBookmarkRepository {
  addBookmark(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<void>;
  removeBookmark(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<void>;
  getBookmarks(userId: UniqueEntityId): Promise<UniqueEntityId[]>;
}
