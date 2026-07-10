import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class AddBookmarkCommand implements ICommand {
    readonly userId: string;
    readonly articleId: string;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, articleId: string, ipAddress?: string | undefined);
}
