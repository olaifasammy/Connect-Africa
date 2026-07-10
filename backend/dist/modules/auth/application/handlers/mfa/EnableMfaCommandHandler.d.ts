import { ICommandHandler } from '../../../../../shared/application/handlers/ICommandHandler';
import { ICommand } from '../../../../../shared/application/commands/ICommand';
import { IUserRepository } from '../../../../auth/domain/repositories/UserRepository';
import { ITotpProvider } from '../../../../auth/domain/interfaces/ITotpProvider';
import { EventBus } from '../../../../../shared/infrastructure/queue/EventBus';
export declare class EnableMfaCommand implements ICommand {
    readonly userId: string;
    readonly ipAddress?: string | undefined;
    constructor(userId: string, ipAddress?: string | undefined);
}
export declare class EnableMfaCommandHandler implements ICommandHandler<EnableMfaCommand, {
    secret: string;
}> {
    private userRepository;
    private totpProvider;
    private eventBus;
    constructor(userRepository: IUserRepository, totpProvider: ITotpProvider, eventBus: EventBus);
    handle(command: EnableMfaCommand): Promise<{
        secret: string;
    }>;
}
