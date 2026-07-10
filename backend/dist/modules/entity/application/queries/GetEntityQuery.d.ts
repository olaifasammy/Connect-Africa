import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class GetEntityQuery implements IQuery {
    readonly entityId: string;
    constructor(entityId: string);
}
