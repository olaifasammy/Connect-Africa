import { DomainEvent } from '@shared/domain/DomainEvent';
import { UniqueEntityId } from '@shared/domain/UniqueEntityId';

export class ArticleUpdatedEvent extends DomainEvent {
  constructor(
    public readonly articleId: UniqueEntityId,
    public readonly entityIds: UniqueEntityId[] = [],
    public readonly relationshipIds: UniqueEntityId[] = []
  ) {
    super(articleId);
  }
}
