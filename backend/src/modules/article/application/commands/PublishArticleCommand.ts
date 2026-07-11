import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class PublishArticleCommand {
  constructor(
    public readonly articleId: UniqueEntityId
  ) {}
}
