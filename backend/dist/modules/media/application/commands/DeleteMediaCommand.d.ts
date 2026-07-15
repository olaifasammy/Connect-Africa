import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class DeleteMediaCommand implements ICommand {
    readonly id: string;
    constructor(id: string);
}
