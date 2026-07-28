import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IReadingHistoryRepository {
  addEntry(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<void>;
  getHistory(userId: UniqueEntityId): Promise<{ articleId: UniqueEntityId; timestamp: Date }[]>;
}
