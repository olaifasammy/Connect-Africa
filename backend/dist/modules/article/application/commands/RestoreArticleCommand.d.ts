import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class RestoreArticleCommand {
    readonly articleId: UniqueEntityId;
    readonly revisionId: UniqueEntityId;
    constructor(articleId: UniqueEntityId, revisionId: UniqueEntityId);
}
