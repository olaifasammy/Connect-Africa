import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { LoginCommand } from '../commands/LoginCommand';
import { IUserRepository } from '@modules/auth/domain/repositories/UserRepository';
import { IPasswordHasher } from '@modules/auth/domain/interfaces/IPasswordHasher';
import { IJwtProvider } from '@modules/auth/domain/interfaces/IJwtProvider';
import { AuthenticationService } from '@modules/auth/domain/services/AuthenticationService';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';
import { AuditLogger } from '@shared/infrastructure/logging/AuditLogger';
import { PostgresAuditRepository } from '@modules/audit/infrastructure/audit/PostgresAuditRepository';
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { UserLoggedInEvent } from '@modules/auth/domain/events/UserLoggedInEvent';

export class LoginCommandHandler implements ICommandHandler<LoginCommand, string> {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher,
    private jwtProvider: IJwtProvider,
    private auditRepository: PostgresAuditRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: LoginCommand): Promise<string> {
    const authService = new AuthenticationService(this.passwordHasher);
    const user = await this.userRepository.findByEmail(command.email);

    if (!user || !(await authService.verifyPassword(user, command.password))) {
      await this.auditRepository.log({ user: command.email, action: 'LOGIN', resource: 'AUTH', status: 'FAILURE' });
      throw new AuthenticationError('Invalid credentials');
    }

    await this.auditRepository.log({ user: user.id.toString(), action: 'LOGIN', resource: 'AUTH', status: 'SUCCESS' });
    
    // Emit domain event
    await this.eventBus.publish(new UserLoggedInEvent(user.id));
    
    return this.jwtProvider.generateToken(user.id.toString());
  }
}
