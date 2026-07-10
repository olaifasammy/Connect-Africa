import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class DeleteAccountCommand implements ICommand {
    readonly userId: string;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, ipAddress?: string | undefined);
}
