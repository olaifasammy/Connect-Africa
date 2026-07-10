import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class ListAliasesQuery implements IQuery {
    readonly entityId: string;
    constructor(entityId: string);
}
