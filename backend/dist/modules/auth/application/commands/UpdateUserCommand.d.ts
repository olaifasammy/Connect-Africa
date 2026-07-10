import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class UpdateUserCommand implements ICommand {
    readonly adminUserId: string;
    readonly userIdToUpdate: string;
    readonly updates: Record<string, any>;
    readonly ipAddress?: string | undefined;
    constructor(adminUserId: string, userIdToUpdate: string, updates: Record<string, any>, ipAddress?: string | undefined);
}
