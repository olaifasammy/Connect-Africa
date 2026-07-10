import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { ResetPasswordCommand } from '../commands/ResetPasswordCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '../../../auth/domain/interfaces/IPasswordHasher';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class ResetPasswordCommandHandler implements ICommandHandler<ResetPasswordCommand, void> {
    private userRepository;
    private passwordHasher;
    private eventBus;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher, eventBus: EventBus);
    handle(command: ResetPasswordCommand): Promise<void>;
}
