import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class ResetPasswordCommand implements ICommand {
    readonly email: string;
    readonly newPassword: string;
    readonly resetToken: string;
    readonly ipAddress?: string | undefined;
    constructor(email: string, newPassword: string, resetToken: string, ipAddress?: string | undefined);
}
