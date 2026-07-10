import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class UpdateProfileCommand implements ICommand {
    readonly userId: string;
    readonly displayName?: string | undefined;
    readonly bio?: string | undefined;
    readonly avatarUrl?: string | undefined;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, displayName?: string | undefined, bio?: string | undefined, avatarUrl?: string | undefined, ipAddress?: string | undefined);
}
