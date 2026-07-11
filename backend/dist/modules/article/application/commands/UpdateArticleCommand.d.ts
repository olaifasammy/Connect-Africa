import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class UpdateArticleCommand {
    readonly articleId: UniqueEntityId;
    readonly title?: string | undefined;
    readonly summary?: string | undefined;
    readonly content?: string | undefined;
    constructor(articleId: UniqueEntityId, title?: string | undefined, summary?: string | undefined, content?: string | undefined);
}
