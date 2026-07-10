import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { DeleteUserCommand } from '../commands/DeleteUserCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand, void> {
    private userRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, eventBus: EventBus);
    handle(command: DeleteUserCommand): Promise<void>;
}
