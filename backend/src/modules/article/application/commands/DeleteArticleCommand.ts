import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class DeleteArticleCommand {
  constructor(
    public readonly articleId: UniqueEntityId
  ) {}
}
