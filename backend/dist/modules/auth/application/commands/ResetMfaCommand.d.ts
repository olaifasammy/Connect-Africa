import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class ResetMfaCommand implements ICommand {
    readonly adminUserId: string;
    readonly userId: string;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, userId: string, ipAddress?: string | undefined);
}
