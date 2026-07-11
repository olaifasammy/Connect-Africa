import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class RestoreArticleCommand {
  constructor(
    public readonly articleId: UniqueEntityId,
    public readonly revisionId: UniqueEntityId
  ) {}
}
