import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class ForceLogoutCommand implements ICommand {
    readonly adminUserId: string;
    readonly userId: string;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, userId: string, ipAddress?: string | undefined);
}
