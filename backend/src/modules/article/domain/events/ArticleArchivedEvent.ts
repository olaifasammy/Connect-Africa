import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ArticleArchivedEvent extends DomainEvent {
  constructor(articleId: UniqueEntityId) {
    super(articleId);
  }
}
