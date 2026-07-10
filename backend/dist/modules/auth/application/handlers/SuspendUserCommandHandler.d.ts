import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { SuspendUserCommand } from '../commands/SuspendUserCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class SuspendUserCommandHandler implements ICommandHandler<SuspendUserCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: SuspendUserCommand): Promise<void>;
}
