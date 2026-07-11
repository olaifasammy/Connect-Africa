import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class ApproveArticleCommand {
    readonly articleId: UniqueEntityId;
    constructor(articleId: UniqueEntityId);
}
