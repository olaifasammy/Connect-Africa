import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class ViewUsersQuery implements IQuery {
    readonly adminUserId: string;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, ipAddress?: string | undefined);
}
