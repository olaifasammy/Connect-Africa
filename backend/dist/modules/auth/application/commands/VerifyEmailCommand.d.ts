import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class VerifyEmailCommand implements ICommand {
    readonly userId: string;
    readonly token: string;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, token: string, ipAddress?: string | undefined);
}
