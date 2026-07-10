import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class DeleteUserCommand implements ICommand {
    readonly adminUserId: string;
    readonly userIdToDelete: string;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, userIdToDelete: string, ipAddress?: string | undefined);
}
