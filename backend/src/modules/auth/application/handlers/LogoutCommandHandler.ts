import { ICommandHandler } from '@shared/application/handlers/ICommandHandler';
import { ICommand } from '@shared/application/commands/ICommand';
import { ISessionRepository } from '@modules/auth/domain/repositories/ISessionRepository';
import { AuditLogger } from '@modules/auth/infrastructure/AuditLogger'; // Fixed path
import { EventBus } from '@shared/infrastructure/queue/EventBus';
import { SessionRevokedEvent } from '@modules/auth/domain/events/SessionRevokedEvent';
import { AuthenticationError } from '@modules/auth/domain/errors/AuthErrors';

export class LogoutCommand implements ICommand {
  constructor(public readonly token: string, public readonly userId: string, public readonly ipAddress?: string) {}
}

export class LogoutCommandHandler implements ICommandHandler<LogoutCommand, void> {
  constructor(
    private sessionRepository: ISessionRepository,
    private eventBus: EventBus
  ) {}

  async handle(command: LogoutCommand): Promise<void> {
    try {
      await this.sessionRepository.invalidateSession(command.token);
      
      AuditLogger.log({ 
        user: command.userId, 
        action: 'LOGOUT', 
        resource: 'AUTH', 
        status: 'SUCCESS',
        ipAddress: command.ipAddress 
      });
      
      await this.eventBus.publish(new SessionRevokedEvent(command.userId as any, command.token));
    } catch (error) {
      AuditLogger.log({ 
        user: command.userId, 
        action: 'LOGOUT', 
        resource: 'AUTH', 
        status: 'FAILURE',
        ipAddress: command.ipAddress 
      });
      throw new AuthenticationError('Failed to logout');
    }
  }
}
