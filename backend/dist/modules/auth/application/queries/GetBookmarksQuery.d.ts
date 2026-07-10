import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class GetBookmarksQuery implements IQuery {
    readonly userId: string;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, ipAddress?: string | undefined);
}
