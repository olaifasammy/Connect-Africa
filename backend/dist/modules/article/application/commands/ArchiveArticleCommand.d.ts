import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class ArchiveArticleCommand {
    readonly articleId: UniqueEntityId;
    constructor(articleId: UniqueEntityId);
}
