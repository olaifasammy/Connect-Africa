import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class PublishMediaCommand implements ICommand {
    readonly id: string;
    constructor(id: string);
}
