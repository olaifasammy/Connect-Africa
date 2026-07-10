import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { DisableAccountCommand } from '../commands/DisableAccountCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class DisableAccountCommandHandler implements ICommandHandler<DisableAccountCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: DisableAccountCommand): Promise<void>;
}
