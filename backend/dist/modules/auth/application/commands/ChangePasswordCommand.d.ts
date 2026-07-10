import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class ChangePasswordCommand implements ICommand {
    readonly userId: string;
    readonly currentPassword: string;
    readonly newPassword: string;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, currentPassword: string, newPassword: string, ipAddress?: string | undefined);
}
