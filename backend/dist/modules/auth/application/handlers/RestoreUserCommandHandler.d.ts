import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { RestoreUserCommand } from '../commands/RestoreUserCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class RestoreUserCommandHandler implements ICommandHandler<RestoreUserCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: RestoreUserCommand): Promise<void>;
}
