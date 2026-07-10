import { ICommand } from '../../../../shared/application/commands/ICommand';
export declare class UploadAvatarCommand implements ICommand {
    readonly userId: string;
    readonly avatarUrl: string;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, avatarUrl: string, ipAddress?: string | undefined);
}
