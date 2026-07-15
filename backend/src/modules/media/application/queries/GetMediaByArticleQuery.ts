import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class GetMediaByArticleQuery {
  constructor(public readonly articleId: UniqueEntityId) {}
}
