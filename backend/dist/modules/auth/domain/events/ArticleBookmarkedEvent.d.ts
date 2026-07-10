import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class ArticleBookmarkedEvent extends DomainEvent {
    readonly userId: UniqueEntityId;
    readonly articleId: UniqueEntityId;
    constructor(userId: UniqueEntityId, articleId: UniqueEntityId);
}
