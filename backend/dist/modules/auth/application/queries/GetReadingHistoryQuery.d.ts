import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class GetReadingHistoryQuery implements IQuery {
    readonly userId: string;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, ipAddress?: string | undefined);
}
