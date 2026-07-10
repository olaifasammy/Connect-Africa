import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { UnbanUserCommand } from '../commands/UnbanUserCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class UnbanUserCommandHandler implements ICommandHandler<UnbanUserCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: UnbanUserCommand): Promise<void>;
}
