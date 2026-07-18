import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { LoginCommand } from '../commands/LoginCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '../../../auth/domain/interfaces/IPasswordHasher';
import { IJwtProvider } from '../../../auth/domain/interfaces/IJwtProvider';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class LoginCommandHandler implements ICommandHandler<LoginCommand, string> {
    private readonly userRepository;
    private readonly passwordHasher;
    private readonly jwtProvider;
    private readonly eventBus;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher, jwtProvider: IJwtProvider, eventBus: EventBus);
    handle(command: LoginCommand): Promise<string>;
}
