import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { ICommand } from '../../../../shared/application/commands/ICommand';
import { ISessionRepository } from '../../../auth/domain/repositories/ISessionRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class LogoutCommand implements ICommand {
    readonly token: string;
    readonly userId: string;
    readonly ipAddress?: string | undefined;
    constructor(token: string, userId: string, ipAddress?: string | undefined);
}
export declare class LogoutCommandHandler implements ICommandHandler<LogoutCommand, void> {
    private sessionRepository;
    private eventBus;
    constructor(sessionRepository: ISessionRepository, eventBus: EventBus);
    handle(command: LogoutCommand): Promise<void>;
}
