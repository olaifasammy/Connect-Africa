import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class PublishArticleCommand {
    readonly articleId: UniqueEntityId;
    constructor(articleId: UniqueEntityId);
}
