import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class AssignRoleCommand implements ICommand {
    readonly adminUserId: string;
    readonly userId: string;
    readonly role: string;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, userId: string, role: string, ipAddress?: string | undefined);
}
