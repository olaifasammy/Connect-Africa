import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class SuspendUserCommand implements ICommand {
    readonly adminUserId: string;
    readonly userIdToSuspend: string;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, userIdToSuspend: string, ipAddress?: string | undefined);
}
