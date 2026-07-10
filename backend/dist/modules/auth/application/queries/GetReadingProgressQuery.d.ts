import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class GetReadingProgressQuery implements IQuery {
    readonly userId: string;
    readonly articleId: string;
    constructor(userId: string, articleId: string);
}
