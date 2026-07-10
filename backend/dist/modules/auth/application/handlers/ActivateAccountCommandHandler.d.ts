import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { ActivateAccountCommand } from '../commands/ActivateAccountCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class ActivateAccountCommandHandler implements ICommandHandler<ActivateAccountCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: ActivateAccountCommand): Promise<void>;
}
