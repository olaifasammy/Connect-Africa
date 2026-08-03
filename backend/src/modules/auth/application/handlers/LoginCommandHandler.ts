import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { LoginCommand } from '../commands/LoginCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';
import { IJwtProvider } from '@modules/auth/domain/interfaces/IJwtProvider';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { UserLoggedInEvent } from '@modules/auth/domain/events/UserLoggedInEvent';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { AuditLogRequestedEvent } from '@modules/audit/public';

export class LoginCommandHandler implements ICommandHandler<LoginCommand, string> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly jwtProvider: IJwtProvider,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: LoginCommand): Promise<string> {
    const user = await this.userRepository.findByEmail(command.email);
    
    if (!user) {
        throw new AuthenticationError('Invalid credentials');
    }

    if (user.isLocked()) {
        throw new AuthenticationError('Account is locked. Please try again later.');
    }

    const isPasswordValid = await this.passwordHasher.compare(command.password, user.passwordHash.value);

    if (!isPasswordValid) {
        user.incrementFailedLoginAttempts();
        await this.userRepository.save(user);
        throw new AuthenticationError('Invalid credentials');
    }

    user.resetFailedLoginAttempts();
    await this.userRepository.save(user);

    await this.eventBus.publish(new AuditLogRequestedEvent({
        action: 'LOGIN',
        actorId: user.id.toString(),
        actorType: 'USER',
        ipAddress: '127.0.0.1',
        userAgent: 'unknown',
        resourceId: user.id.toString(),
        resourceType: 'AUTH',
        metadata: [{ key: 'status', value: 'SUCCESS' }]
    }));
    
    await this.eventBus.publish(new UserLoggedInEvent(user.id));
    
    return this.jwtProvider.generateToken(user.id.toString());
  }
}
