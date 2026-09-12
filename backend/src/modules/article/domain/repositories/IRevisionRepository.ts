import { Revision } from '../../domain/entities/Revision';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export interface IRevisionRepository {
  save(revision: Revision): Promise<void>;

  findById(
    id: UniqueEntityId,
  ): Promise<Revision | null>;

  findByArticleId(
    articleId: UniqueEntityId,
  ): Promise<Revision[]>;

  getLatestByArticleId(
    articleId: UniqueEntityId,
  ): Promise<Revision | null>;
}
