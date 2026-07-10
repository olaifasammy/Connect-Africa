import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { ChangePasswordCommand } from '../commands/ChangePasswordCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '../../../auth/domain/interfaces/IPasswordHasher';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class ChangePasswordCommandHandler implements ICommandHandler<ChangePasswordCommand, void> {
    private userRepository;
    private passwordHasher;
    private eventBus;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher, eventBus: EventBus);
    handle(command: ChangePasswordCommand): Promise<void>;
}
