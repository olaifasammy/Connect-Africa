import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class ChangeEmailCommand implements ICommand {
    readonly userId: string;
    readonly newEmail: string;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, newEmail: string, ipAddress?: string | undefined);
}
