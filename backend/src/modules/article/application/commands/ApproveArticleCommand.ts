import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ApproveArticleCommand {
  constructor(
    public readonly articleId: UniqueEntityId,
    public readonly userId: string
  ) {}
}
