import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class ArticleCreatedEvent extends DomainEvent {
    constructor(articleId: UniqueEntityId);
}
