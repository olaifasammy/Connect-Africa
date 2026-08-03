import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class SubmitForReviewCommand {
  constructor(
    public readonly articleId: UniqueEntityId
  ) {}
}
