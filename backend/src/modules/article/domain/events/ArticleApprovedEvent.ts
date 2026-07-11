import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ArticleApprovedEvent extends DomainEvent {
  constructor(articleId: UniqueEntityId) {
    super(articleId);
  }
}
