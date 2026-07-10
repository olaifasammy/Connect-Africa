import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface IContinueReadingRepository {
    updateProgress(userId: UniqueEntityId, articleId: UniqueEntityId, progress: number): Promise<void>;
    getProgress(userId: UniqueEntityId, articleId: UniqueEntityId): Promise<number | null>;
}
