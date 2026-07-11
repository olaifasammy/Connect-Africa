import { Entity } from '../../../../shared/domain/Entity';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { ArticleProps } from './Article';
export interface RevisionProps {
    articleId: UniqueEntityId;
    contentSnapshot: Omit<ArticleProps, 'version'>;
    version: number;
    createdAt: Date;
    metadata: Record<string, any>;
}
export declare class Revision extends Entity<RevisionProps> {
    private constructor();
    static create(props: RevisionProps, id?: UniqueEntityId): Revision;
    get contentSnapshot(): Omit<ArticleProps, 'version'>;
}
