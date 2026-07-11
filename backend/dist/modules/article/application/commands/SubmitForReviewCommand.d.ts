import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class SubmitForReviewCommand {
    readonly articleId: UniqueEntityId;
    constructor(articleId: UniqueEntityId);
}
