import { ICommandHandler } from '../../../../shared/application/handlers/ICommandHandler';
import { LoginCommand } from '../commands/LoginCommand';
import { IUserRepository } from '../../../auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '../../../auth/domain/interfaces/IPasswordHasher';
import { IJwtProvider } from '../../../auth/domain/interfaces/IJwtProvider';
import { PostgresAuditRepository } from '../../../audit/infrastructure/audit/PostgresAuditRepository';
import { EventBus } from '../../../../shared/infrastructure/queue/EventBus';
export declare class LoginCommandHandler implements ICommandHandler<LoginCommand, string> {
    private userRepository;
    private passwordHasher;
    private jwtProvider;
    private auditRepository;
    private eventBus;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher, jwtProvider: IJwtProvider, auditRepository: PostgresAuditRepository, eventBus: EventBus);
    handle(command: LoginCommand): Promise<string>;
}
