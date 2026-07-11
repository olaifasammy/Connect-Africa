import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class ArticleDeletedEvent extends DomainEvent {
    constructor(articleId: UniqueEntityId);
}
