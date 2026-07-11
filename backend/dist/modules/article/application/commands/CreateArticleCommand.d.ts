import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export declare class CreateArticleCommand {
    readonly title: string;
    readonly summary: string;
    readonly content: string;
    readonly authorId: UniqueEntityId;
    readonly language: string;
    constructor(title: string, summary: string, content: string, authorId: UniqueEntityId, language?: string);
}
