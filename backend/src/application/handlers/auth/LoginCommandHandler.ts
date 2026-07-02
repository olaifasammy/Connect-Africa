import { ICommandHandler } from '../ICommandHandler';
import { LoginCommand } from '../../commands/auth/LoginCommand';
import { IUserRepository } from '@domain/auth/repositories/UserRepository';
import { IPasswordHasher } from '@domain/auth/interfaces/IPasswordHasher';
import { IJwtProvider } from '@domain/auth/interfaces/IJwtProvider';
import { AuthenticationService } from '@domain/auth/services/AuthenticationService';
import { AuthenticationError } from '@domain/auth/errors/AuthErrors';
import { AuditLogger } from '@infrastructure/logging/AuditLogger';
import { PostgresAuditRepository } from '@infrastructure/repositories/audit/PostgresAuditRepository';
import { EventBus } from '@infrastructure/queue/EventBus';
import { UserLoggedInEvent } from '@domain/auth/events/UserLoggedInEvent';

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
    await this.eventBus.publish(new UserLoggedInEvent(user.id, user.email.value));
    
    return this.jwtProvider.generateToken(user.id.toString());
  }
}
