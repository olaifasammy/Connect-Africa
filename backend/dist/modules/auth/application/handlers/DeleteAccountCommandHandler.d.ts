import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { DeleteAccountCommand } from '../commands/DeleteAccountCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class DeleteAccountCommandHandler implements ICommandHandler<DeleteAccountCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: DeleteAccountCommand): Promise<void>;
}
