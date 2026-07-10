import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class BanUserCommand implements ICommand {
    readonly adminUserId: string;
    readonly userIdToBan: string;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, userIdToBan: string, ipAddress?: string | undefined);
}
