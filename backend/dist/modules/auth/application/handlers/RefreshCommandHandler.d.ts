import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { ICommand } from '../../../../shared/application/commands/ICommand';
import { IJwtProvider } from '../../../auth/domain/interfaces/IJwtProvider';
export declare class RefreshCommand implements ICommand {
    readonly refreshToken: string;
    readonly userId: string;
    readonly ipAddress?: string | undefined;
    constructor(refreshToken: string, userId: string, ipAddress?: string | undefined);
}
export declare class RefreshCommandHandler implements ICommandHandler<RefreshCommand, string> {
    private jwtProvider;
    constructor(jwtProvider: IJwtProvider);
    handle(command: RefreshCommand): Promise<string>;
}
