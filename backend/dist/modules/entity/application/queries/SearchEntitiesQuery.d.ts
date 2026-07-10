import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class SearchEntitiesQuery implements IQuery {
    readonly term: string;
    constructor(term: string);
}
