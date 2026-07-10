import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { RestoreAccountCommand } from '../commands/RestoreAccountCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class RestoreAccountCommandHandler implements ICommandHandler<RestoreAccountCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: RestoreAccountCommand): Promise<void>;
}
