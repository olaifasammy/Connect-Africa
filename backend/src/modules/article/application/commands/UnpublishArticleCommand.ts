import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class UnpublishArticleCommand {
  constructor(
    public readonly articleId: UniqueEntityId,
    public readonly userId: string
  ) {}
}
