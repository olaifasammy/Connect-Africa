import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class RegisterUserCommand implements ICommand {
    readonly email: string;
    readonly password: string;
    readonly ipAddress?: string | undefined;
    constructor(email: string, password: string, ipAddress?: string | undefined);
}
