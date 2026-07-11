import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class DeleteArticleCommand {
    readonly articleId: UniqueEntityId;
    constructor(articleId: UniqueEntityId);
}
