import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { BanUserCommand } from '../commands/BanUserCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class BanUserCommandHandler implements ICommandHandler<BanUserCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: BanUserCommand): Promise<void>;
}
