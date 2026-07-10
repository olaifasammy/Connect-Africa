import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class GetProfileQuery implements IQuery {
    readonly userId: string;
    readonly adminUserId?: string | undefined;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, adminUserId?: string | undefined, ipAddress?: string | undefined);
}
