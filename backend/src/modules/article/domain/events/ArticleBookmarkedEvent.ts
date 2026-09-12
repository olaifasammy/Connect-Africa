import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ArticleBookmarkedEvent extends DomainEvent {
  constructor(public readonly userId: UniqueEntityId, public readonly articleId: UniqueEntityId) {
    super(userId);
  }
}
