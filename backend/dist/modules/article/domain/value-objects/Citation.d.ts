import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
export interface CitationProps {
    articleId: UniqueEntityId;
    sourceId: UniqueEntityId;
    text: string;
    order: number;
}
export declare class Citation {
    readonly articleId: UniqueEntityId;
    readonly sourceId: UniqueEntityId;
    readonly text: string;
    readonly order: number;
    constructor(articleId: UniqueEntityId, sourceId: UniqueEntityId, text: string, order: number);
}
