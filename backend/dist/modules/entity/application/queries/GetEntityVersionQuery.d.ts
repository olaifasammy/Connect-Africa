import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class GetEntityVersionQuery implements IQuery {
    readonly entityId: string;
    readonly versionId: string;
    constructor(entityId: string, versionId: string);
}
