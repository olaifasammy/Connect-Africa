import { IQuery } from '../../../../shared/application/queries/IQuery';
export declare class SearchUsersQuery implements IQuery {
    readonly adminUserId: string;
    readonly searchTerm: string;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, searchTerm: string, ipAddress?: string | undefined);
}
