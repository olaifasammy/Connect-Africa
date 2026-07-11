import { DomainEvent } from '../../../../shared/domain/DomainEvent';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class ArticleUpdatedEvent extends DomainEvent {
    readonly articleId: UniqueEntityId;
    readonly entityIds: UniqueEntityId[];
    readonly relationshipIds: UniqueEntityId[];
    constructor(articleId: UniqueEntityId, entityIds?: UniqueEntityId[], relationshipIds?: UniqueEntityId[]);
}
