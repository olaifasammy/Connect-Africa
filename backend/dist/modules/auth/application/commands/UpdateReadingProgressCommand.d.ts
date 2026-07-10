import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class UpdateReadingProgressCommand implements ICommand {
    readonly userId: string;
    readonly articleId: string;
    readonly progress: number;
    readonly ipAddress: string;
    constructor(userId: string, articleId: string, progress: number, ipAddress: string);
}
