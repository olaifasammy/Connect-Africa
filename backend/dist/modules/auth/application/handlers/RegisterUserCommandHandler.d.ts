import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { RegisterUserCommand } from '../commands/RegisterUserCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '../../../auth/domain/interfaces/IPasswordHasher';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand, void> {
    private userRepository;
    private passwordHasher;
    private eventBus;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher, eventBus: EventBus);
    handle(command: RegisterUserCommand): Promise<void>;
}
