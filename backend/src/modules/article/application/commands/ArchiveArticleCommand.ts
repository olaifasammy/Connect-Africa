import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ArchiveArticleCommand {
  constructor(
    public readonly articleId: UniqueEntityId
  ) {}
}
