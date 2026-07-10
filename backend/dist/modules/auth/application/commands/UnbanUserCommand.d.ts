import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class UnbanUserCommand implements ICommand {
    readonly adminUserId: string;
    readonly userIdToUnban: string;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, userIdToUnban: string, ipAddress?: string | undefined);
}
