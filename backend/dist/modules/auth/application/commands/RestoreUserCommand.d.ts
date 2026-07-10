import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class RestoreUserCommand implements ICommand {
    readonly adminUserId: string;
    readonly userIdToRestore: string;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, userIdToRestore: string, ipAddress?: string | undefined);
}
