import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class LoginCommand implements ICommand {
    readonly email: string;
    readonly password: string;
    constructor(email: string, password: string);
}
