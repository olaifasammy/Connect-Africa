import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class UpdateArticleCommand {
  constructor(
    public readonly articleId: UniqueEntityId,
    public readonly expectedVersion: number,
    public readonly title?: string,
    public readonly summary?: string,
    public readonly content?: string
  ) {}
}
