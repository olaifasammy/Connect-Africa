import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class RestoreAccountCommand implements ICommand {
    readonly userId: string;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, ipAddress?: string | undefined);
}
