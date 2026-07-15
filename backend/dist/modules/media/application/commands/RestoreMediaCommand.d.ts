import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class RestoreMediaCommand implements ICommand {
    readonly id: string;
    constructor(id: string);
}
