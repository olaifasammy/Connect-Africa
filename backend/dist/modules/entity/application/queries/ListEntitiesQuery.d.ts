import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class ListEntitiesQuery implements IQuery {
    readonly page: number;
    readonly limit: number;
    constructor(page?: number, limit?: number);
}
