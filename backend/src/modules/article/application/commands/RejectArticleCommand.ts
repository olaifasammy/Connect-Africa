import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RejectArticleCommand {
  constructor(
    public readonly articleId: UniqueEntityId,
    public readonly userId: string,
    public readonly reason?: string
  ) {}
}
