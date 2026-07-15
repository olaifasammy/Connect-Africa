import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class CopyMediaCommand implements ICommand {
    readonly id: string;
    readonly destinationId: string;
    constructor(id: string, destinationId: string);
}
